using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.ResponseModels.MatchResponses
{
    public class WinratesResponse
    {
        public WinratesData Data { get; set; }
    }

    public class WinratesData
    {
        public WinratesHeroStats HeroStats { get; set; }
    }

    public class WinratesHeroStats
    {
        public List<WinWeek> WinWeek { get; set; }
        public List<MatchUp> MatchUp { get; set; }
    }

    public class WinWeek
    {
        public int MatchCount { get; set; }
        public int WinCount { get; set; }
    }

    public class MatchUp
    {
        public int HeroId { get; set; }
        public List<MatchUpInfo> Vs { get; set; }
        public List<MatchUpInfo> With { get; set; }
    }

    public class MatchUpInfo
    {
        public int HeroId1 { get; set; }
        public int HeroId2 { get; set; }
        public double WinsAverage { get; set; }
    }

}
