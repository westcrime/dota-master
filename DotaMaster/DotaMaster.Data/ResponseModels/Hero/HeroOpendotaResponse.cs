using Newtonsoft.Json;

namespace DotaMaster.Data.ResponseModels.Hero
{
    public class HeroOpendotaResponse
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        [JsonProperty("localized_name")]
        public required string DisplayName { get; set; }
    }
}
