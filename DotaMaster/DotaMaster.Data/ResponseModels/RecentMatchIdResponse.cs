using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.ResponseModels
{
    public class RecentMatchIdResponse
    {
        [JsonProperty("match_id")]
        public long MatchId { get; set; }
    }
}
