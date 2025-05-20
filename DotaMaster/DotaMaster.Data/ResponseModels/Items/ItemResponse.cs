using Newtonsoft.Json;

namespace DotaMaster.Data.ResponseModels.Items
{
    public class ItemResponse
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        public required string Name { get; set; }

        [JsonProperty("displayName")]
        public required string DisplayName { get; set; }

        [JsonProperty("stat")]
        public Stat? Stat { get; set; }

        [JsonProperty("attributes")]
        public List<Attribute>? Attributes { get; set; }

        [JsonProperty("language")]
        public required Language Language { get; set; }

        [JsonProperty("image")]
        public string? Image { get; set; }
    }

    public class Stat
    {
        [JsonProperty("cost")]
        public int? Cost { get; set; }
    }

    public class Attribute
    {
        [JsonProperty("name")]
        public required string Name { get; set; }

        [JsonProperty("value")]
        public required string Value { get; set; }
    }

    public class Language
    {
        [JsonProperty("description")]
        public string? Description { get; set; }

        [JsonProperty("lore")]
        public required List<string> Lore { get; set; }
    }
}
