using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Application.Models
{
    public record HeroStatModel(
        int HeroId,
        string Name,
        int MatchCount,
        int WinCount,
        double AvgKills,
        double AvgDeaths,
        double AvgAssists,
        double AvgGpm,
        double AvgXpm,
        double Impact);
}
