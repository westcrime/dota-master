using DotaMaster.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Application.Models
{
    public record PickAnalyzeModel
    {
        public double HeroWinrate { get; set; }
        public List<HeroWrInfoModel> HeroWrWithAlliedHeroes { get; set; }
        public List<HeroWrInfoModel> HeroWrWithEnemyHeroes { get; set; }
        public string? PickAdvice { get; set; }
    }
}
