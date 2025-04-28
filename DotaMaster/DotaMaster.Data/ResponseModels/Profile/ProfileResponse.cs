using Newtonsoft.Json;

namespace DotaMaster.Data.ResponseModels.Profile
{
    public class Player
    {
        public required string SteamId { get; set; }

        [JsonProperty("personaname")]
        public required string Username { get; set; }

        [JsonProperty("avatarfull")]
        public required string AvatarUrl { get; set; }
    }
}
