using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.ResponseModels.HeroResponses
{
    public class HeroResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [JsonProperty("localized_name")]
        public string LocalizedName { get; set; }
    }
}
