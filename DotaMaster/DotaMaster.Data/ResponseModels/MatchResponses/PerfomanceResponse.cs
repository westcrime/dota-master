using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.ResponseModels.MatchResponses
{
    public class PlayerPerfomancePlayerModel
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

    public class PlayerPerfomanceMatchModel
    {
        public List<PlayerPerfomancePlayerModel> Players { get; set; }
    }

    public class PlayerPerfomanceDataModel
    {
        public PlayerPerfomanceMatchModel Match { get; set; }
    }

    public class PerfomanceResponse
    {
        public PlayerPerfomanceDataModel Data { get; set; }
    }

}
