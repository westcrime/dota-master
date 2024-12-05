using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Application.Models
{
    public record MatchBasicInfoModel(
        string MatchId,
        bool IsWin,
        TimeSpan Duration,
        int HeroId,
        int Kills,
        int Deaths,
        int Assists);
}
