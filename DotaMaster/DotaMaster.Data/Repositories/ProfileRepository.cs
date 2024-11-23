using AutoMapper;
using DotaMaster.Data.Entities;
using DotaMaster.Data.IdConverters;
using DotaMaster.Data.ResponseModels;
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

            // Отправка GET-запроса
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            // Десериализация ответа
            var jsonResponse = await response.Content.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject<ProfileResponse>(jsonResponse);

            // Формирование результата
            return _mapper.Map<Entities.Profile>(data.Response.Players[0]);
        }

        public async Task<BasicInfo> GetBasicInfoAsync(string steamId)
        {
            var dotaId = SteamIdConverter.SteamIdToDotaId(SteamIdConverter.GetIDFromCommunity(steamId));
            // URL для получения данных
            string wlUrl = $"https://api.opendota.com/api/players/{dotaId}/wl";
            string profileUrl = $"https://api.opendota.com/api/players/{dotaId}";

            // Отправка GET-запроса
            var wlResponse = await _httpClient.GetAsync(wlUrl);
            wlResponse.EnsureSuccessStatusCode();

            var profileResponse = await _httpClient.GetAsync(profileUrl);
            profileResponse.EnsureSuccessStatusCode();

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
    }
}
