using Newtonsoft.Json;

namespace DotaMaster.Data.ResponseModels.ProfileResponses
{
    public class Player
    {
        [JsonProperty("steamid")]
        public string SteamId { get; set; }

        [JsonProperty("personaname")]
        public string Username { get; set; }

        [JsonProperty("avatarfull")]
        public string AvatarUrl { get; set; }
    }
}
