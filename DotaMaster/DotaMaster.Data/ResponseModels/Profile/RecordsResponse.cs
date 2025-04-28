using Newtonsoft.Json;

namespace DotaMaster.Data.ResponseModels.Profile
{
    public class RecordsResponse
    {
        public required string Field { get; set; }

        [JsonProperty("n")]
        public int Matches { get; set; }

        [JsonProperty("sum")]
        public long TotalCount { get; set; }

    }
}
