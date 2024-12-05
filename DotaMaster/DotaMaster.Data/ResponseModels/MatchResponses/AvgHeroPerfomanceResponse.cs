using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.ResponseModels.MatchResponses
{
    public class AvgHeroPerfomanceResponse
    {
        public DataModel Data { get; set; }
    }
    public class HeroStatsModel
    {
        public double TopCore { get; set; }
        public double TopSupport { get; set; }
        public double Kills { get; set; }
        public double Deaths { get; set; }
        public double Assists { get; set; }
        public double Networth { get; set; }
        public double Xp { get; set; }
        public double Cs { get; set; }
        public double HeroDamage { get; set; }
        public double GoldFed { get; set; }
        public double XpFed { get; set; }
    }

    public class HeroStatsContainerModel
    {
        public List<HeroStatsModel> Stats { get; set; }
    }

    public class DataModel
    {
        public HeroStatsContainerModel HeroStats { get; set; }
    }
}
