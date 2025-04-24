using DotaMaster.Data.Entities.Match;

namespace DotaMaster.Data.ResponseModels.Match
{
    public class UserStatsResponse
    {
        public required string Position { get; set; }
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
        public required Stats Stats { get; set; }
    }

    public class Stats
    {
        public required List<int> ImpPerMinute { get; set; }
        public required List<ItemPurchase> ItemPurchases { get; set; }
    }
}
