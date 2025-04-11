using System.Text.Json.Serialization;

namespace DotaMaster.Data.ResponseModels.ItemResponses
{
    public class ItemResponse
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("dname")]
        public string? Dname { get; set; }

        [JsonPropertyName("lore")]
        public string? Lore { get; set; }
        [JsonPropertyName("cost")]
        public int? Cost { get; set; }
        [JsonPropertyName("img")]
        public required string Img { get; set; }
        [JsonPropertyName("abilities")]
        public Abilities[]? Abilities { get; set; }
    }

    public class Abilities
    {
        [JsonPropertyName("description")]
        public string? Description { get; set; }
    }
}
