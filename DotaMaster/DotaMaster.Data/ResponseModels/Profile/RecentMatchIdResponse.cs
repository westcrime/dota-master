using Newtonsoft.Json;

namespace DotaMaster.Data.ResponseModels.ProfileResponses
{
    public class RecentMatchIdResponse
    {
        [JsonProperty("match_id")]
        public long MatchId { get; set; }
    }
}
