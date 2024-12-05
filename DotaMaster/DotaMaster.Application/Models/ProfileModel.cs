using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Application.Models
{
    public record ProfileModel(string DotaId, string SteamId, string Username, string AvatarUrl);
}
