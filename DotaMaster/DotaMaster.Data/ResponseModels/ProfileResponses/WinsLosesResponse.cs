using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.ResponseModels.ProfileResponses
{
    public class WinsLosesResponse
    {
        [JsonProperty("lose")]
        public int Loses { get; set; }
        [JsonProperty("win")]
        public int Wins { get; set; }
    }
}
