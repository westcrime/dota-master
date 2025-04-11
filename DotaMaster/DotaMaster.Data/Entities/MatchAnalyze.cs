using DotaMaster.Data.Entities.Enums;
using DotaMaster.Data.Entities.Match;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.Entities
{
    public class MatchAnalyze
    {
        [Key]
        public int Id { get; set; }

        public int HeroId { get; set; }
        public List<int> DireHeroes { get; set; }
        public List<int> RadiantHeroes { get; set; }
        public int Rank { get; set; }
        public Roles Role { get; set; }
        public PickAnalyze PickAnalyze { get; set; }
        public Laning LaningAnalyze { get; set; }
        public ItemsAnalyze ItemsAnalyze { get; set; }

    }
}
