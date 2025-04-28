using Newtonsoft.Json;
using System.Text.Json;

namespace DotaMaster.Data.ResponseModels.Profile
{
    public class HeroStatsResponse
    {
        public required Data Data { get; set; }
    }

    public class Data
    {
        public required PlayerData Player { get; set; }
    }

    public class PlayerData
    {
        [JsonProperty("heroesPerformance")]
        public required Stat[] HeroStats { get; set; }
    }

    public class Stat
    {
        public int HeroId { get; set; }
        public required Hero Hero { get; set; }
        public int MatchCount { get; set; }
        public int WinCount { get; set; }
        public double AvgKills { get; set; }
        public double AvgDeaths { get; set; }
        public double AvgAssists { get; set; }
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
        public required string Name { get; set; }
    }
}
