using System.Net.Http.Headers;
using System.Text;
using AutoMapper;
using DotaMaster.Data.Entities;
using DotaMaster.Data.ResponseModels.Hero;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DotaMaster.Data.Repositories
{
    public class HeroRepository
    {
        private readonly string _stratzApiKey;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private const string _openDotaUrl = "https://api.opendota.com/api";
        private const string _stratzGraphqlUrl = "https://api.stratz.com/graphql";
        private readonly IMapper _mapper;

        public HeroRepository(IConfiguration configuration, HttpClient httpClient, IMapper mapper)
        {
            _mapper = mapper;
            _httpClient = httpClient;
            _configuration = configuration;
            _stratzApiKey = _configuration["StratzApiKey"]
                ?? throw new ArgumentNullException("Stratz api key is null!");
        }

        public async Task<IEnumerable<Hero>> GetHeroes()
        {
            string graphqlQuery = @"
                query GetHeroes {
                  constants {
                    heroes {
                      id
                      name
                      displayName
                    }
                  }
                }";

            var requestBody = new
            {
                query = graphqlQuery
            };
            var response = await SendGraphqlRequest(requestBody);
            response.EnsureSuccessStatusCode();
            var jsonResponse = await response.Content.ReadAsStringAsync();
            var parsed = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonResponse)
                ?? throw new ArgumentNullException("Can not parse GetHeroes response");
            var heroResponse = ((((JObject)parsed["data"])
                ["constants"] ?? throw new ArgumentNullException("Can not parse GetHeroes response"))
                ["heroes"] ?? throw new ArgumentNullException("Can not parse GetHeroes response"))
                .ToObject<List<HeroResponse>>() ?? throw new ArgumentNullException("Can not parse to HeroResponse");
            return _mapper.Map<List<Hero>>(heroResponse);
        }

        public async Task<IEnumerable<Hero>> GetHeroesOpendota()
        {
            string url = $"{_openDotaUrl}/heroes";

            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var heroesJson = await response.Content.ReadAsStringAsync();
            var heroes = JsonConvert.DeserializeObject<HeroOpendotaResponse[]>(heroesJson)
                ?? throw new ArgumentNullException("Can not parse GetHeroesOpendota response: response is null");
            return _mapper.Map<List<Hero>>(heroes);
        }

        private async Task<HttpResponseMessage> SendGraphqlRequest(object requestBody)
        {
            string jsonRequestBody = JsonConvert.SerializeObject(requestBody);
            var httpRequest = new HttpRequestMessage(HttpMethod.Post, _stratzGraphqlUrl)
            {
                Content = new StringContent(jsonRequestBody, Encoding.UTF8, "application/json")
            };
            httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _stratzApiKey);
            httpRequest.Headers.UserAgent.ParseAdd("STRATZ_API");
            return await _httpClient.SendAsync(httpRequest);
        }
    }
}
