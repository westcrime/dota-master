using AutoMapper;
using DotaMaster.Data.Entities;
using DotaMaster.Data.IdConverters;
using DotaMaster.Data.ResponseModels;
using DotaMaster.Domain.Exceptions;
using GraphQL;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.Repositories
{
    public class ProfileRepository
    {
        private readonly string _steamApiKey;
        private readonly string _stratzApiKey;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly IMapper _mapper;

        public ProfileRepository(IConfiguration configuration, HttpClient httpClient, IMapper mapper)
        {
            _mapper = mapper;
            _httpClient = httpClient;
            _configuration = configuration;
            _steamApiKey = _configuration["Steam:ApiKey"];
            _stratzApiKey = _configuration["StratzApiKey"];
        }

        public async Task<Entities.Profile> GetSteamUserProfileAsync(string steamId)
        {
            // URL для получения данных
            string url = $"https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key={_steamApiKey}&steamids={steamId}";

            var dotaId = SteamIdConverter.SteamIdToDotaId(SteamIdConverter.GetIDFromCommunity(steamId));

            // Отправка GET-запроса
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            // Десериализация ответа
            var jsonResponse = await response.Content.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject<ProfileResponse>(jsonResponse);

            var profile = _mapper.Map<Entities.Profile>(data.Response.Players[0]);
            profile.DotaId = dotaId;

            // Формирование результата
            return profile;
        }

        public async Task<BasicInfo> GetBasicInfoAsync(string steamId)
        {
            var dotaId = SteamIdConverter.SteamIdToDotaId(SteamIdConverter.GetIDFromCommunity(steamId));
            // URL для получения данных
            string wlUrl = $"https://api.opendota.com/api/players/{dotaId}/wl";
            string profileUrl = $"https://api.opendota.com/api/players/{dotaId}";

            // Отправка GET-запросов
            var wlResponse = await _httpClient.GetAsync(wlUrl);
            var profileResponse = await _httpClient.GetAsync(profileUrl);

            if (!profileResponse.IsSuccessStatusCode)
            {
                if (profileResponse.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    throw new PrivateProfileException($"Profile {steamId} is private!");
                }
            }

            // Десериализация ответа
            var wlJsonResponse = await wlResponse.Content.ReadAsStringAsync();
            var winsLoses = JsonConvert.DeserializeObject<WinsLosesResponse>(wlJsonResponse);

            var profileJsonResponse = await profileResponse.Content.ReadAsStringAsync();
            var profile = JsonConvert.DeserializeObject<OpenDotaProfileResponse>(profileJsonResponse);

            var basicInfo = new BasicInfo()
            {
                DotaId = dotaId,
                SteamId = steamId,
                Loses = winsLoses.Loses,
                Wins = winsLoses.Wins,
                Rank = profile.Rank,
                IsDotaPlusSub = profile.moreData.IsDotaPlusSub
            };

            // Формирование результата
            return basicInfo;
        }

        public async Task<Records> GetRecordsAsync(string steamId)
        {
            var dotaId = SteamIdConverter.SteamIdToDotaId(SteamIdConverter.GetIDFromCommunity(steamId));
            // URL для получения данных
            string recordsUrl = $"https://api.opendota.com/api/players/{dotaId}/totals";

            // Отправка GET-запросов
            var recordsResponseData = await _httpClient.GetAsync(recordsUrl);

            if (!recordsResponseData.IsSuccessStatusCode)
            {
                if (recordsResponseData.StatusCode == System.Net.HttpStatusCode.NotFound)
                {
                    throw new PrivateProfileException($"Profile {steamId} is private!");
                }
            }

            // Десериализация ответа
            var recordsJsonResponse = await recordsResponseData.Content.ReadAsStringAsync();
            var recordsResponse = JsonConvert.DeserializeObject<RecordsResponse[]>(recordsJsonResponse);

            var records = new Records();

            foreach (var record in recordsResponse)
            {
                if (record.Field == "kills")
                {
                    records.Kills = record.TotalCount;
                    records.AvgKills = (int)Math.Ceiling(record.TotalCount / (double)record.Matches);
                }
                else if (record.Field == "deaths")
                {
                    records.Deaths = record.TotalCount;
                    records.AvgDeaths = (int)Math.Ceiling(record.TotalCount / (double)record.Matches);
                }
                else if (record.Field == "assists")
                {
                    records.Assists = record.TotalCount;
                    records.AvgAssists = (int)Math.Ceiling(record.TotalCount / (double)record.Matches);
                }
                else if (record.Field == "gold_per_min")
                {
                    records.Gold = record.TotalCount;
                    records.AvgGold = (int)Math.Ceiling(record.TotalCount / (double)record.Matches);
                }
                else if (record.Field == "xp_per_min")
                {
                    records.Xp = record.TotalCount;
                    records.AvgXp = (int)Math.Ceiling(record.TotalCount / (double)record.Matches);
                }
                else if (record.Field == "last_hits")
                {
                    records.LastHits = record.TotalCount;
                    records.AvgLastHits = (int)Math.Ceiling(record.TotalCount / (double)record.Matches);
                }
                else if (record.Field == "denies")
                {
                    records.Denies = record.TotalCount;
                    records.AvgDenies = (int)Math.Ceiling(record.TotalCount / (double)record.Matches);
                }
                else if (record.Field == "hero_damage")
                {
                    records.HeroDamage = record.TotalCount;
                    records.AvgHeroDamage = (int)Math.Ceiling(record.TotalCount / (double)record.Matches);
                }
                else if (record.Field == "tower_damage")
                {
                    records.TowerDamage = record.TotalCount;
                    records.AvgTowerDamage = (int)Math.Ceiling(record.TotalCount / (double)record.Matches);
                }
                else if (record.Field == "hero_healing")
                {
                    records.HeroHealing = record.TotalCount;
                    records.AvgHeroHealing = (int)Math.Ceiling(record.TotalCount / (double)record.Matches);
                }
            }

            // Формирование результата
            return records;
        }

        public async Task<IEnumerable<HeroStat>> GetRecentHeroesStatsAsync(string steamId)
        {
            // Преобразуем Steam ID в Dota ID
            string dotaId = SteamIdConverter.SteamIdToDotaId(SteamIdConverter.GetIDFromCommunity(steamId));

            // URL для получения последних матчей
            string recentMatchesUrl = $"https://api.opendota.com/api/players/{dotaId}/recentMatches";

            // URL для GraphQL запроса
            string graphqlUrl = "https://api.stratz.com/graphql";

            // Отправка GET-запроса для получения последних матчей
            var recentMatchesResponse = await _httpClient.GetAsync(recentMatchesUrl);

            // Десериализация ответа с последними матчами
            var recentMatchesJson = await recentMatchesResponse.Content.ReadAsStringAsync();
            var recentMatches = JsonConvert.DeserializeObject<RecentMatchIdResponse[]>(recentMatchesJson);

            if (recentMatches == null || recentMatches.Length == 0)
            {
                throw new PrivateProfileException($"Profile {steamId} is private!");
            }

            // GraphQL запрос для получения статистики героев
            string graphqlQuery = @"
                query GetUser($userId: Long!, $matchIds: [Long]) {
                  player(steamAccountId: $userId) {
                    heroesPerformance(request: {matchIds: $matchIds}) {
                      heroId
                      hero {
                        name
                      }
                      matchCount
                      avgKills
                      avgDeaths
                      duration
                      avgAssists
                      goldPerMinute
                      experiencePerMinute
                      winCount
                      imp
                      best
                      positionScore {
                        score
                        matchCount
                        imp
                      }
                    }
                  }
                }";

            // Извлекаем список ID матчей
            var matchIds = recentMatches.Select(match => match.MatchId).ToArray();

            // Формируем тело запроса
            var requestBody = new
            {
                query = graphqlQuery,
                variables = new { userId = long.Parse(dotaId), matchIds }
            };

            // Сериализация тела запроса в JSON
            var jsonRequestBody = JsonConvert.SerializeObject(requestBody);

            // Подготовка тела запроса для отправки
            var content = new StringContent(jsonRequestBody, Encoding.UTF8, "application/json");

            // Создание HTTP запроса с добавлением заголовка авторизации
            var request = new HttpRequestMessage(HttpMethod.Post, graphqlUrl)
            {
                Content = content
            };
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _stratzApiKey);
            request.Headers.Add("User-Agent", "STRATZ_API");

            // Отправка запроса и получение ответа
            using var response = await _httpClient.SendAsync(request);
            var responseContent = await response.Content.ReadAsStringAsync();

            // Проверка успешности ответа
            response.EnsureSuccessStatusCode();

            // Десериализация ответа с данными статистики
            var heroStatsResponse = JsonConvert.DeserializeObject<HeroStatsResponse>(responseContent);

            // Преобразуем данные статистики в более удобный формат
            var heroStats = heroStatsResponse.Data.Player.HeroStats;
            var heroStatList = heroStats.Select(heroStat => new HeroStat
            {
                HeroId = heroStat.HeroId,
                Name = heroStat.Hero.Name,
                MatchCount = heroStat.MatchCount,
                WinCount = heroStat.WinCount,
                AvgAssists = heroStat.AvgAssists,
                AvgDeaths = heroStat.AvgDeaths,
                AvgKills = heroStat.AvgKills,
                AvgGpm = heroStat.Gpm,
                AvgXpm = heroStat.Xpm,
                Impact = heroStat.Impact
            }).ToList();

            // Возвращаем результат
            return heroStatList;

        }
    }
}
