using AutoMapper;
using DotaMaster.Data.Entities;
using DotaMaster.Data.ResponseModels.HeroResponses;
using DotaMaster.Data.ResponseModels.ProfileResponses;
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
    public class HeroRepository
    {
        private readonly string _steamApiKey;
        private readonly string _stratzApiKey;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly IMapper _mapper;

        public HeroRepository(IConfiguration configuration, HttpClient httpClient, IMapper mapper)
        {
            _mapper = mapper;
            _httpClient = httpClient;
            _configuration = configuration;
            _steamApiKey = _configuration["Steam:ApiKey"];
            _stratzApiKey = _configuration["StratzApiKey"];
        }

        public async Task<IEnumerable<Entities.Hero>> GetHeroesInfo()
        {
            const string heroesUrl = $"https://api.opendota.com/api/heroes";

            // Отправка GET-запросов
            var heroesResponse = await _httpClient.GetAsync(heroesUrl);

            if (!heroesResponse.IsSuccessStatusCode)
            {
                throw new InvalidOperationException($"Received null response for heroes.");
            }

            // Десериализация ответа
            var heroesJsonResponse = await heroesResponse.Content.ReadAsStringAsync();
            var heroes = JsonConvert.DeserializeObject<IEnumerable<HeroResponse>>(heroesJsonResponse);

            return _mapper.Map<IEnumerable<Entities.Hero>>(heroes);
        }
    }
}
