using System.Text.Json.Serialization;

namespace DotaMaster.Data.ResponseModels.MatchResponses
{
    public class PlayerPerfomancePlayerModel
    {
        public int HeroId { get; set; }
        public bool IsRadiant { get; set; }
        public int Networth { get; set; }
        public int Kills { get; set; }
        public int Deaths { get; set; }
        public int Assists { get; set; }
        public int GoldPerMinute { get; set; }
        public int ExperiencePerMinute { get; set; }
        public int NumDenies { get; set; }
        public int NumLastHits { get; set; }
        public int Imp { get; set; }
        public required StatsResponse Stats { get; set; }
    }

    public class PlayerPerfomanceMatchModel
    {
        public required List<PlayerPerfomancePlayerModel> Players { get; set; }
    }

    public class PlayerPerfomanceDataModel
    {
        public required PlayerPerfomanceMatchModel Match { get; set; }
    }

    public class PerfomanceResponse
    {
        public required PlayerPerfomanceDataModel Data { get; set; }
    }

    public class StatsResponse
    {
        [JsonPropertyName("impPerMinute")]
        public required List<int> ImpactPerMinute { get; set; }
        public required List<ItemPurchaseResponse> ItemPurchases { get; set; }
    }

    public class ItemPurchaseResponse
    {
        public int ItemId { get; set; }
        public int Time { get; set; }
    }
}