using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Application.Models
{
    public class GeneralHeroPerfomanceModel
    {
        public HeroPlayerPerfomanceModel PlayerPerfomance { get; set; }
        public AvgHeroPerfomanceModel AvgHeroPerfomance { get; set; }
        public string? Advice { get; set; }
    }

    public class HeroPlayerPerfomanceModel
    {
        public int HeroId { get; set; }
        public bool IsRadiant { get; set; }
        public int Networth { get; set; }
        public int Kills { get; set; }
        public int Deaths { get; set; }
        public int Assists { get; set; }
        public int GoldPerMinute { get; set; }
        public int ExperiencePerMinute { get; set; }
        public int NumDenies { get; set; }
        public int NumLastHits { get; set; }
        public int Imp { get; set; }
    }

    public class AvgHeroPerfomanceModel
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
}
