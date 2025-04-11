using System.Text.Json.Serialization;

namespace DotaMaster.Data.ResponseModels.MatchResponses
{
    public class MatchDetailsAboutUserResponse
    {
        [JsonPropertyName("data")]
        public required MatchData Data { get; set; }
    }

    public class MatchData
    {
        [JsonPropertyName("match")]
        public required Match Match { get; set; }
    }

    public class Match
    {
        [JsonPropertyName("players")]
        public required List<Player> Players { get; set; }
    }

    public class Player
    {
        [JsonPropertyName("heroId")]
        public int HeroId { get; set; }
    }
}
