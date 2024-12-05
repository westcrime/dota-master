using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.ResponseModels.MatchResponses
{
    public class HeroesInMatchInfoResponse
    {
        public HeroesInMatchData Data { get; set; }
    }

    public class HeroesInMatchData
    {
        public HeroesInMatch Match { get; set; }
    }

    public class HeroesInMatch
    {
        public List<PlayerHeroes> Players { get; set; }
        public int Rank { get; set; }
    }

    public class PlayerHeroes
    {
        public int HeroId { get; set; }
        public bool IsRadiant { get; set; }
    }
}
