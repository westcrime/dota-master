using DotaMaster.Data.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace DotaMaster.Data.ResponseModels
{
    public class HeroStatsResponse
    {
        [JsonProperty("data")]
        public Data Data { get; set; }
    }

    public class Data
    {
        [JsonProperty("player")]
        public PlayerData Player { get; set; }
    }

    public class PlayerData
    {
        [JsonProperty("heroesPerformance")]
        public Stat[] HeroStats { get; set; }
    }

    public class Stat
    {
        [JsonProperty("heroId")]
        public int HeroId { get; set; }

        [JsonProperty("hero")]
        public Hero Hero { get; set; }

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
        public string Name { get; set; }
    }
}
