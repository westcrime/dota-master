using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.ResponseModels.MatchResponses
{
    public class LaningResponse
    {
        public Data Data { get; set; }
    }

    public class Data
    {
        public MatchLaning Match { get; set; }
        public HeroStats HeroStats { get; set; }
    }

    public class MatchLaning
    {
        public List<PlayerLaning> Players { get; set; }
    }

    public class PlayerLaning
    {
        public Stats Stats { get; set; }
    }

    public class Stats
    {
        public List<int> LastHitsPerMinute { get; set; }
        public List<Event> KillEvents { get; set; }
        public List<Event> DeathEvents { get; set; }
        public List<int> NetworthPerMinute { get; set; }
    }

    public class Event
    {
        public int Time { get; set; }
    }

    public class HeroStats
    {
        public List<HeroStat> Stats { get; set; }
    }

    public class HeroStat
    {
        public float Kills { get; set; }
        public float Deaths { get; set; }
        public float Assists { get; set; }
        public float Cs { get; set; }
        public float Xp { get; set; }
        public float Networth { get; set; }
    }

}
