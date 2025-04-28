using Newtonsoft.Json;

namespace DotaMaster.Data.ResponseModels.Profile
{
    public class BasicInfoResponse
    {
        public required int MatchCount { get; set; }
        [JsonProperty("winCount")]
        public required int Wins { get; set; }
        [JsonProperty("isFollowed")]
        public required bool IsDotaPlusSub { get; set; }
        public required SteamAccount SteamAccount { get; set; }
        public required long FirstMatchDate { get; set; }
    }

    public class SteamAccount
    {
        public required int SeasonRank { get; set; }
    }
}
