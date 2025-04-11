using Newtonsoft.Json;
using System.Text.Json;

namespace DotaMaster.Data.ResponseModels.ProfileResponses
{
    public class HeroStatsResponse
    {
        [JsonProperty("data")]
        public required Data Data { get; set; }
    }

    public class Data
    {
        [JsonProperty("player")]
        public required PlayerData Player { get; set; }
    }

    public class PlayerData
    {
        [JsonProperty("heroesPerformance")]
        public required Stat[] HeroStats { get; set; }
    }

    public class Stat
    {
        [JsonProperty("heroId")]
        public int HeroId { get; set; }

        [JsonProperty("hero")]
        public required Hero Hero { get; set; }

        [JsonProperty("matchCount")]
        public int MatchCount { get; set; }

        [JsonProperty("winCount")]
        public int WinCount { get; set; }

        [JsonProperty("avgKills")]
        public double AvgKills { get; set; }

        [JsonProperty("avgDeaths")]
        public double AvgDeaths { get; set; }

        [JsonProperty("avgAssists")]
        public double AvgAssists { get; set; }

        [JsonProperty("duration")]
        public double Duration { get; set; }

        [JsonProperty("goldPerMinute")]
        public double Gpm { get; set; }

        [JsonProperty("experiencePerMinute")]
        public double Xpm { get; set; }

        [JsonProperty("imp")]
        public double Impact { get; set; }
    }

    public class Hero
    {
        [JsonProperty("name")]
        public required string Name { get; set; }
    }
}
