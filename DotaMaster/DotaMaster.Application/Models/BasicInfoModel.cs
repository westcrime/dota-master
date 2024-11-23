using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Application.Models
{
    public record BasicInfoModel(string SteamId, string DotaId, string Rank, int Loses, int Wins, bool IsDotaPlusSub);
}
