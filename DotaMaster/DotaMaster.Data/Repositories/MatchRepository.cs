using AutoMapper;
using DotaMaster.Data.Entities;
using DotaMaster.Data.IdConverters;
using DotaMaster.Data.ResponseModels.MatchResponses;
using DotaMaster.Data.ResponseModels.ProfileResponses;
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
    public class MatchRepository
    {
        private readonly string _steamApiKey;
        private readonly string _stratzApiKey;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly IMapper _mapper;

        public MatchRepository(IConfiguration configuration, HttpClient httpClient, IMapper mapper)
        {
            _mapper = mapper;
            _httpClient = httpClient;
            _configuration = configuration;
            _steamApiKey = _configuration["Steam:ApiKey"];
            _stratzApiKey = _configuration["StratzApiKey"];
        }

        //public async Task<PickAnalyze> GetPickAnalyzeAsync(int userHeroId, List<int> radiantHeroes, List<int> direHeroes, int rank)
        //{

        //}

        public async Task<LaningAnalyze> GetLaningAnalyzeAsync(long matchId, string steamId)
        {
            // Преобразуем Steam ID в Dota ID
            string dotaId = SteamIdConverter.SteamIdToDotaId(SteamIdConverter.GetIDFromCommunity(steamId));

            // URL для GraphQL запроса
            string graphqlUrl = "https://api.stratz.com/graphql";

            string additionalInfoQuery = @"query GetUser($matchId: Long!, $dotaId: Long) {
                  match(id: $matchId) {
                    players(steamAccountId: $dotaId) {
                      position
                      heroId
                    }
                    rank
                  }
                }";

            // Формируем тело запроса
            var additionalInfoRequestBody = new
            {
                query = additionalInfoQuery,
                variables = new 
                {
                    dotaId = long.Parse(dotaId),
                    matchId
                }
            };

            // Сериализация тела запроса в JSON
            var additionalInfoJsonRequestBody = JsonConvert.SerializeObject(additionalInfoRequestBody);

            // Подготовка тела запроса для отправки
            var additionalInfoContent = new StringContent(additionalInfoJsonRequestBody, Encoding.UTF8, "application/json");

            // Создание HTTP запроса с добавлением заголовка авторизации
            var additionalInfoRequest = new HttpRequestMessage(HttpMethod.Post, graphqlUrl)
            {
                Content = additionalInfoContent
            };
            additionalInfoRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _stratzApiKey);
            additionalInfoRequest.Headers.Add("User-Agent", "STRATZ_API");

            // Отправка запроса и получение ответа
            using var additionalInfoResponse = await _httpClient.SendAsync(additionalInfoRequest);
            var additionalInfoResponseContent = await additionalInfoResponse.Content.ReadAsStringAsync();

            // Проверка успешности ответа
            additionalInfoResponse.EnsureSuccessStatusCode();

            // Десериализация ответа с данными статистики
            var additionalInfo = JsonConvert.DeserializeObject<AdditionalInfoResponse>(additionalInfoResponseContent);

            if (additionalInfo == null)
            {
                throw new Exception($"Additional info for laning analyze is null for match {matchId}");
            }

            // GraphQL запрос для получения статистики героев
            string graphqlQuery = @"query GetLaneAnalyze($matchId: Long!, $pos: [MatchPlayerPositionType], $heroId: [Short], $dotaId: Long, $rank: RankBracketBasicEnum) {
              match(id: $matchId) {
                players(steamAccountId: $dotaId) {
                  stats {
                    lastHitsPerMinute
                    killEvents {
                      time
                    }
                    deathEvents {
                      time
                    }
                    networthPerMinute
                  }
                }
              }
              heroStats {
                stats(
                  heroIds: $heroId
                  bracketBasicIds: [$rank]
                  maxTime: 10
                  positionIds: $pos
                ) {
                  kills
                  deaths
                  assists
                  cs
                  xp
                  networth
                }
              }
            }";

            var rank = "";
            if (additionalInfo.Data.Match.Rank <= 0)
            {
                rank = "UNCALIBRATED";
            } 
            else if (additionalInfo.Data.Match.Rank > 10 && additionalInfo.Data.Match.Rank < 30)
            {
                rank = "HERALD_GUARDIAN";
            }
            else if (additionalInfo.Data.Match.Rank > 30 && additionalInfo.Data.Match.Rank < 50)
            {
                rank = "CRUSADER_ARCHON";
            }
            else if (additionalInfo.Data.Match.Rank > 50 && additionalInfo.Data.Match.Rank < 70)
            {
                rank = "LEGEND_ANCIENT";
            }
            else if (additionalInfo.Data.Match.Rank > 70 && additionalInfo.Data.Match.Rank < 90)
            {
                rank = "DIVINE_IMMORTAL";
            }

            // Формируем тело запроса
            var laningInfoRequestBody = new
            {
                query = graphqlQuery,
                variables = new
                {
                    dotaId = long.Parse(dotaId),
                    matchId,
                    heroId = new[] { additionalInfo.Data.Match.Players.First().HeroId },
                    rank,
                    pos = additionalInfo.Data.Match.Players.First().Position
                }
            };

            // Сериализация тела запроса в JSON
            var laningInfoJsonRequestBody = JsonConvert.SerializeObject(laningInfoRequestBody);

            // Подготовка тела запроса для отправки
            var laningInfoContent = new StringContent(laningInfoJsonRequestBody, Encoding.UTF8, "application/json");

            // Создание HTTP запроса с добавлением заголовка авторизации
            var laningInfoRequest = new HttpRequestMessage(HttpMethod.Post, graphqlUrl)
            {
                Content = laningInfoContent
            };
            laningInfoRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _stratzApiKey);
            laningInfoRequest.Headers.Add("User-Agent", "STRATZ_API");

            // Отправка запроса и получение ответа
            using var laningInfoResponse = await _httpClient.SendAsync(laningInfoRequest);
            var laningInfoResponseContent = await laningInfoResponse.Content.ReadAsStringAsync();

            // Проверка успешности ответа
            laningInfoResponse.EnsureSuccessStatusCode();

            // Десериализация ответа с данными статистики
            var laningInfo = JsonConvert.DeserializeObject<LaningResponse>(laningInfoResponseContent);

            if (laningInfo == null)
            {
                throw new Exception($"Can't get laning info for match {matchId}");
            }

            var laningAnalyze = new LaningAnalyze()
            {
                AvgLaningCs = laningInfo.Data.HeroStats.Stats.First().Cs,
                AvgLaningDeaths = laningInfo.Data.HeroStats.Stats.First().Deaths,
                AvgLaningKills = laningInfo.Data.HeroStats.Stats.First().Kills,
                AvgLaningNetworth = laningInfo.Data.HeroStats.Stats.First().Networth,
                DotaId = dotaId,
                HeroId = additionalInfo.Data.Match.Players.First().HeroId,
                MatchId = matchId.ToString(),
                Position = additionalInfo.Data.Match.Players.First().Position,
                Rank = rank,
                LaningCs = laningInfo.Data.Match.Players.First().Stats.LastHitsPerMinute.Take(10).Sum(),
                LaningNetworth = laningInfo.Data.Match.Players.First().Stats.NetworthPerMinute[9],
                LaningDeaths = laningInfo.Data.Match.Players.First().Stats.DeathEvents.Where(d => d.Time < 600).Count(),
                LaningKills = laningInfo.Data.Match.Players.First().Stats.KillEvents.Where(d => d.Time < 600).Count()
            };

            return laningAnalyze;
        }
    }
}
