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
        public double[] HeroWrWithAlliedHeroes { get; set; }
        public double[] HeroWrWithEnemyHeroes { get; set; }
    }
}
