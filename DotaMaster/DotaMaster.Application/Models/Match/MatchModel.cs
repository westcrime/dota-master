namespace DotaMaster.Application.Models.Match
{
    public class MatchModel
    {
        public long MatchId { get; set; }
        public long DotaId { get; set; }
        public required GeneralInfo GeneralInfo { get; set; }
        public required UserStats UserStats { get; set; }
        public required AvgHeroStats AvgHeroStats { get; set; }
        public required Laning Laning { get; set; }
        public required Picks Picks { get; set; }
        public required string WinratesAnalysis { get; set; }
        public required string LaningAnalysis { get; set; }
        public required string ItemsAnalysis { get; set; }
    }

    public class GeneralInfo
    {
        public bool DidRadiantWin { get; set; }
        public int Rank { get; set; }
        public int DurationSeconds { get; set; }
        public required List<int> RadiantNetworthLeads { get; set; }
        public required List<int> RadiantExperienceLeads { get; set; }
        public required List<int> RadiantKills { get; set; }
        public required List<int> DireKills { get; set; }
        public required List<PlayerStats> Players { get; set; }
    }
    
    public class PlayerStats
    {
        public required string Position { get; set; }
        public required string SteamAccountId { get; set; }
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
        public int? Item0Id { get; set; }
        public int? Item1Id { get; set; }
        public int? Item2Id { get; set; }
        public int? Item3Id { get; set; }
        public int? Item4Id { get; set; }
        public int? Item5Id { get; set; }
        public int? Backpack0Id { get; set; }
        public int? Backpack1Id { get; set; }
        public int? Backpack2Id { get; set; }
    }

    public class UserStats
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
        public required List<int> ImpactPerMinute { get; set; }
        public required List<ItemPurchase> ItemPurchases { get; set; }
    }

    public class ItemPurchase
    {
        public int ItemId { get; set; }
        public int Time { get; set; }
    }

    public class AvgHeroStats
    {
        public double TopCore { get; set; }
        public double TopSupport { get; set; }
        public double Kills { get; set; }
        public double Deaths { get; set; }
        public double Assists { get; set; }
        public double Networth { get; set; }
        public double Xp { get; set; }
        public double Cs { get; set; }
        public double HeroDamage { get; set; }
        public double GoldFed { get; set; }
        public double XpFed { get; set; }
    }

    public class Laning
    {
        public required string Position { get; set; }
        public required string Rank { get; set; }
        public required List<int> LaneAlliesHeroIds { get; set; }
        public required List<int> LaneEnemiesHeroIds { get; set; }
        public int HeroId { get; set; }
        public long DotaId { get; set; }
        public int LaningCs { get; set; }
        public double AvgLaningCs { get; set; }
        public int LaningKills { get; set; }
        public double AvgLaningKills { get; set; }
        public int LaningDeaths { get; set; }
        public double AvgLaningDeaths { get; set; }
        public int LaningNetworth { get; set; }
        public double AvgLaningNetworth { get; set; }
    }

    public class Picks
    {
        public int HeroId { get; set; }
        public double HeroWinrate { get; set; }
        public required List<HeroWr> HeroWrWithAlliedHeroes { get; set; }
        public required List<HeroWr> HeroWrWithEnemyHeroes { get; set; }
    }

    public class HeroWr
    {
        public double Winrate { get; set; }
        public int HeroId { get; set; }
    }
}
