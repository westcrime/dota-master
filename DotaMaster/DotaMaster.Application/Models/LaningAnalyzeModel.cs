using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Application.Models
{
    public record LaningAnalyzeModel(
        string MatchId,
        string Position,
        string Rank,
        int HeroId,
        string DotaId,
        int LaningCs,
        double AvgLaningCs,
        int LaningKills,
        double AvgLaningKills,
        int LaningDeaths,
        double AvgLaningDeaths,
        int LaningNetworth,
        double AvgLaningNetworth);
}
