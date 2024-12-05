using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.Entities
{
    public class Profile
    {
        public string DotaId { get; set; }
        public string SteamId { get; set; }
        public string Username { get; set; }
        public string AvatarUrl { get; set; }
    }
}
