using Newtonsoft.Json;

namespace DotaMaster.Data.Repositories
{
    public class HeroRepository(HttpClient httpClient)
    {
        private readonly HttpClient _httpClient = httpClient;
        private const string _openDotaUrl = "https://api.opendota.com/api";

        public async Task<IEnumerable<Entities.Hero>> GetHeroesInfo()
        {
            const string url = $"{_openDotaUrl}/heroes";
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            var heroesJsonResponse = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<IEnumerable<Entities.Hero>>(heroesJsonResponse)
                ?? throw new ArgumentNullException("GetHeroesInfo response is null");
        }
    }
}
