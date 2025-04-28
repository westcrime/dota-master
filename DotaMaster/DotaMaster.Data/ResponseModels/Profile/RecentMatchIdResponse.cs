using Newtonsoft.Json;

namespace DotaMaster.Data.ResponseModels.Profile
{
    public class RecentMatchIdResponse
    {
        [JsonProperty("match_id")]
        public long MatchId { get; set; }
    }
}
