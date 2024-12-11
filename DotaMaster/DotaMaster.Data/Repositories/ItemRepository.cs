using AutoMapper;
using DotaMaster.Data.Entities;
using DotaMaster.Data.ResponseModels.HeroResponses;
using DotaMaster.Data.ResponseModels.ItemResponses;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace DotaMaster.Data.Repositories
{
    public class ItemRepository
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly IMapper _mapper;

        public ItemRepository(IConfiguration configuration, HttpClient httpClient, IMapper mapper)
        {
            _mapper = mapper;
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<IEnumerable<Item>> GetAllItemsAsync()
        {
            const string itemsUrl = "https://api.opendota.com/api/constants/items";

            // Отправка GET-запроса
            var response = await _httpClient.GetAsync(itemsUrl);

            if (!response.IsSuccessStatusCode)
            {
                throw new InvalidOperationException("Failed to fetch items.");
            }

            var jsonResponse = await response.Content.ReadAsStringAsync();

            // Настройки десериализации
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var itemsDict = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(jsonResponse, options);

            if (itemsDict == null)
            {
                throw new InvalidOperationException("No items found in the response.");
            }

            var items = new List<Item>();

            foreach (var entry in itemsDict)
            {
                var itemResponse = entry.Value.Deserialize<ItemResponse>(options);
                if (itemResponse != null)
                {
                    items.Add(new Item
                    {
                        Id = itemResponse.Id,
                        Title = itemResponse.Dname,
                        Cost = itemResponse.Cost ?? 0,
                        Description = itemResponse.Abilities?.FirstOrDefault()?.Description ?? "No description available",
                        IconUrl = !string.IsNullOrEmpty(itemResponse.Img)
                            ? "https://cdn.dota2.com" + itemResponse.Img
                            : "https://cdn.dota2.com/default-image.png"
                    });
                }
            }

            return items;
        }

    }
}
