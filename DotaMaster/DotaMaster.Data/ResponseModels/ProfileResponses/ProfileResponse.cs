using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.ResponseModels.ProfileResponses
{
    public class ProfileResponse
    {
        [JsonProperty("response")]
        public PlayerResponse Response { get; set; }
    }

    public class PlayerResponse
    {
        [JsonProperty("players")]
        public Player[] Players { get; set; }
    }

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
