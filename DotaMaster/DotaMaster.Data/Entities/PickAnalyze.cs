using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.Entities
{
    public class PickAnalyze
    {
        public double HeroWinrate { get; set; }
        public List<HeroWrInfo> HeroWrWithAlliedHeroes { get; set; }
        public List<HeroWrInfo> HeroWrWithEnemyHeroes { get; set; }
    }

    public class HeroWrInfo
    {
        public double Winrate { get; set; }
        public int HeroId { get; set; }
    }
}
