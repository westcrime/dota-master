using Newtonsoft.Json;

namespace DotaMaster.Data.ResponseModels.ProfileResponses
{
    public class BasicInfoResponse
    {
        [JsonProperty("matchCount")]
        public required int MatchCount { get; set; }
        [JsonProperty("winCount")]
        public required int Wins { get; set; }
        [JsonProperty("isFollowed")]
        public required bool IsDotaPlusSub { get; set; }
        [JsonProperty("steamAccount")]
        public required SteamAccount SteamAccount { get; set; }

        [JsonProperty("firstMatchDate")]
        public required long FirstMatchDate { get; set; }
    }

    public class SteamAccount
    {
        [JsonProperty("seasonRank")]
        public required int SeasonRank { get; set; }
    }
}
