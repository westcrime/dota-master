using System.Text.Json;
using DotaMaster.Data.Entities;
using DotaMaster.Data.ResponseModels.Items;

namespace DotaMaster.Data.Repositories
{
    public class ItemRepository(HttpClient httpClient)
    {
        private readonly HttpClient _httpClient = httpClient;
        private const string _openDotaUrl = "https://api.opendota.com/api";
        private const string _dotaIconsUrl = "https://cdn.dota2.com";

        public async Task<IEnumerable<Item>> GetAllItemsAsync()
        {
            const string url = $"{_openDotaUrl}/constants/items";
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();
            var itemsDict = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(jsonResponse)
                ?? throw new ArgumentNullException("GetAllItemsAsync response is null");

            var items = new List<Item>();
            foreach (var entry in itemsDict)
            {
                var itemResponse = entry.Value.Deserialize<ItemResponse>()
                    ?? throw new ArgumentNullException("GetAllItemsAsync: Can't deserialize");
                items.Add(new Item
                {
                    Id = itemResponse.Id,
                    Title = itemResponse.Dname ?? "No Title Available",
                    Lore = itemResponse.Lore ?? "No Lore Available",
                    Cost = itemResponse.Cost,
                    Description = itemResponse.Abilities?.FirstOrDefault()?.Description ?? "No Description Available",
                    IconUrl = string.IsNullOrEmpty(itemResponse.Img)
                           ? _dotaIconsUrl + itemResponse.Img
                           : $"{_dotaIconsUrl}/default-image.png"
                });
            }
            return items;
        }

    }
}
