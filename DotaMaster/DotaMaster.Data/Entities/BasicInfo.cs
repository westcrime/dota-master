using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.Entities
{
    public class BasicInfo
    {
        public string SteamId { get; set; }
        public string DotaId { get; set; }
        public string Rank { get; set; }
        public int Loses { get; set; }
        public int Wins { get; set; }
    }
}
