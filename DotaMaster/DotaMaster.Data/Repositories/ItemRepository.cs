using System.Net.Http.Headers;
using System.Text;
using AutoMapper;
using DotaMaster.Data.Entities;
using DotaMaster.Data.ResponseModels.Items;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DotaMaster.Data.Repositories
{
    public class ItemRepository
    {
        private readonly string _stratzApiKey;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private const string _stratzGraphqlUrl = "https://api.stratz.com/graphql";
        private const string _dotaIconsUrl = "https://cdn.dota2.com/apps/dota2/images/items/";
        private readonly IMapper _mapper;

        public ItemRepository(IConfiguration configuration, HttpClient httpClient, IMapper mapper)
        {
            _mapper = mapper;
            _httpClient = httpClient;
            _configuration = configuration;
            _stratzApiKey = _configuration["StratzApiKey"]
                ?? throw new ArgumentNullException("Stratz api key is null!");
        }
        public async Task<IEnumerable<Item>> GetAllItemsAsync()
        {
            string graphqlQuery = @"query GetItems {
              constants {
                items(language: RUSSIAN) {
                  id
                  name
                  displayName
                  stat {
                    cost
                  }
                  attributes {
                    name
                    value
                  }
                  language {
                    description
                    lore
                  }
                  image
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
                ?? throw new ArgumentNullException("Can not parse GetItems response");
            var itemResponse = ((((JObject)parsed["data"])
                ["constants"] ?? throw new ArgumentNullException("Can not parse GetItems response"))
                ["items"] ?? throw new ArgumentNullException("Can not parse GetItems response"))
                .ToObject<List<ItemResponse>>() ?? throw new ArgumentNullException("Can not parse to ItemResponse");

            var items = new List<Item>();
            foreach (var entry in itemResponse)
            {
                items.Add(new Item
                {
                    Id = entry.Id,
                    DisplayName = entry.DisplayName ?? "Нету имени",
                    Lore = string.Join(' ', entry.Language.Lore),
                    Name = entry.Name,
                    Attributes = _mapper.Map<List<Entities.Attribute>>(entry.Attributes),
                    Cost = entry.Stat?.Cost,
                    Description = entry.Language.Description ?? "Нету описания",
                    IconUrl = string.IsNullOrEmpty(entry.Image)
                           ? $"{_dotaIconsUrl}default-image.png"
                           : _dotaIconsUrl + entry.Image
                });
            }
            return items;
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
