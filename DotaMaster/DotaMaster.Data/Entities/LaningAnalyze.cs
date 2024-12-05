using DotaMaster.Data.Entities.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.Entities
{
    public class LaningAnalyze
    {
        public string MatchId { get; set; }
        public string Position { get; set; }
        public string Rank { get; set; }
        public int HeroId { get; set; }
        public string DotaId { get; set; }
        public int LaningCs { get; set; }
        public double AvgLaningCs { get; set; }
        public int LaningKills { get; set; }
        public double AvgLaningKills { get; set; }
        public int LaningDeaths { get; set; }
        public double AvgLaningDeaths { get; set; }
        public int LaningNetworth { get; set; }
        public double AvgLaningNetworth { get; set; }
    }
}
