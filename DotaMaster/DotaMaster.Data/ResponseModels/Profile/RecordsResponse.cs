using Newtonsoft.Json;

namespace DotaMaster.Data.ResponseModels.ProfileResponses
{
    public class RecordsResponse
    {
        [JsonProperty("field")]
        public required string Field { get; set; }

        [JsonProperty("n")]
        public int Matches { get; set; }

        [JsonProperty("sum")]
        public long TotalCount { get; set; }

    }
}
