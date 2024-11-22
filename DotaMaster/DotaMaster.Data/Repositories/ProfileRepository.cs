using AutoMapper;
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
    }
}
