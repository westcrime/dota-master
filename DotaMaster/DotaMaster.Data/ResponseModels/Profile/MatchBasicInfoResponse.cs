using Newtonsoft.Json;

namespace DotaMaster.Data.ResponseModels.Profile
{
    public class MatchBasicInfoResponse
    {
        [JsonProperty("match_id")]
        public required string MatchId { get; set; }

        [JsonProperty("player_slot")]
        public int PlayerSlot { get; set; }

        [JsonProperty("radiant_win")]
        public bool RadiantWin { get; set; }

        [JsonProperty("duration")]
        public int Duration { get; set; }
        
        [JsonProperty("start_time")]
        public int StartTime { get; set; }
        
        [JsonProperty("skill")]
        public int Skill { get; set; }

        [JsonProperty("hero_id")]
        public int HeroId { get; set; }

        [JsonProperty("kills")]
        public int Kills { get; set; }

        [JsonProperty("deaths")]
        public int Deaths { get; set; }

        [JsonProperty("average_rank")]
        public int? AverageRank { get; set; }

        [JsonProperty("assists")]
        public int Assists { get; set; }
    }
}
