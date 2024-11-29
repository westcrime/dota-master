using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.ResponseModels
{
    public class RecentMatchesResponse
    {
        [JsonProperty("match_id")]
        public string MatchId { get; set; }

        [JsonProperty("player_slot")]
        public int PlayerSlot { get; set; }

        [JsonProperty("radiant_id")]
        public bool RadiantWin { get; set; }
    }
}
