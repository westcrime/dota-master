using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.ResponseModels.ProfileResponses
{
    public class OpenDotaProfileResponse
    {
        [JsonProperty("rank_tier")]
        public string Rank { get; set; }
        [JsonProperty("profile")]
        public MoreData moreData { get; set; }

    }

    public class MoreData
    {

        [JsonProperty("plus")]
        public bool IsDotaPlusSub { get; set; }
    }
}
