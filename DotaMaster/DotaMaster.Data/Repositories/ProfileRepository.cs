using AutoMapper;
using DotaMaster.Data.Entities;
using DotaMaster.Data.IdConverters;
using DotaMaster.Data.ResponseModels;
using DotaMaster.Domain.Exceptions;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
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
    }
}
