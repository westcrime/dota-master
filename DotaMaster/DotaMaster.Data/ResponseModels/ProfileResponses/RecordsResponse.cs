using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.ResponseModels.ProfileResponses
{
    public class RecordsResponse
    {
        [JsonProperty("field")]
        public string Field { get; set; }

        [JsonProperty("n")]
        public int Matches { get; set; }

        [JsonProperty("sum")]
        public long TotalCount { get; set; }

    }
}
