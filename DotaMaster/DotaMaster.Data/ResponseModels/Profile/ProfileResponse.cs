using Newtonsoft.Json;

namespace DotaMaster.Data.ResponseModels.ProfileResponses
{
    public class Player
    {
        [JsonProperty("steamid")]
        public required string SteamId { get; set; }

        [JsonProperty("personaname")]
        public required string Username { get; set; }

        [JsonProperty("avatarfull")]
        public required string AvatarUrl { get; set; }
    }
}
