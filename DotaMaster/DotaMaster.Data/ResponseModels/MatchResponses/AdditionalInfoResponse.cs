using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DotaMaster.Data.ResponseModels.MatchResponses
{
    public class AdditionalInfoResponse
    {
        [JsonPropertyName("data")]
        public MatchData Data { get; set; }
    }

    public class MatchData
    {
        [JsonPropertyName("match")]
        public Match Match { get; set; }
    }

    public class Match
    {
        [JsonPropertyName("players")]
        public List<Player> Players { get; set; }

        [JsonPropertyName("rank")]
        public int Rank { get; set; }
        [JsonPropertyName("durationSeconds")]
        public int DurationSeconds { get; set; }
    }

    public class Player
    {
        [JsonPropertyName("position")]
        public string Position { get; set; }
        [JsonPropertyName("heroId")]
        public int HeroId { get; set; }
    }
}
