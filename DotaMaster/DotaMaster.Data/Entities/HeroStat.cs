using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.Entities
{
    public class HeroStat
    {
        public int HeroId { get; set; }
        public string Name { get; set; }
        public int MatchCount { get; set; }
        public int WinCount { get; set; }
        public double AvgKills { get; set; }
        public double AvgDeaths { get; set; }
        public double AvgAssists { get; set; }
        public double AvgGpm { get; set; }
        public double AvgXpm { get; set; }
        public double Impact { get; set; }
    }
}
