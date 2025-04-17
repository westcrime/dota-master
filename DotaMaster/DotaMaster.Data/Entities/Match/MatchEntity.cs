﻿namespace DotaMaster.Data.Entities.Match
{
    public class MatchEntity
    {
        public long MatchId { get; set; }
        public long DotaId { get; set; }
        public required GeneralInfoEntity GeneralInfo { get; set; }
        public required UserStatsEntity UserStats { get; set; }
        public required AvgHeroStatsEntity AvgHeroStats { get; set; }
        public required LaningEntity Laning { get; set; }
        public required WinratesEntity Winrates { get; set; }
        public required string WinratesAnalysis { get; set; }
        public required string LaningAnalysis { get; set; }
        public required string ItemsAnalysis { get; set; }
    }

    public class GeneralInfoEntity
    {
        public bool DidRadiantWin { get; set; }
        public int Rank { get; set; }
        public int DurationSeconds { get; set; }
        public required List<int> RadiantNetworthLeads { get; set; }
        public required List<int> RadiantExperienceLeads { get; set; }
        public required List<int> RadiantKills { get; set; }
        public required List<int> DireKills { get; set; }
        public required List<PlayerStatsEntity> Players { get; set; }
    }
    
    public class PlayerStatsEntity
    {
        public required string Position { get; set; }
        public required string SteamAccountId { get; set; }
        public required HeroEntity Hero { get; set; }
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

    public class UserStatsEntity
    {
        public required HeroEntity HeroId { get; set; }
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
        public required List<ItemPurchaseEntity> ItemPurchases { get; set; }
    }

    public class ItemPurchaseEntity
    {
        public int ItemId { get; set; }
        public int Time { get; set; }
    }

    public class AvgHeroStatsEntity
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

    public class HeroEntity
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string LocalizedName { get; set; }
    }

    public class LaningEntity
    {
        public required string Position { get; set; }
        public required string Rank { get; set; }
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

    public class WinratesEntity
    {
        public required List<WinWeekEntity> WinWeek { get; set; }
        public required List<MatchUpEntity> MatchUp { get; set; }
    }

    public class WinWeekEntity
    {
        public int MatchCount { get; set; }
        public int WinCount { get; set; }
    }

    public class MatchUpEntity
    {
        public int HeroId { get; set; }
        public required List<double> Vs { get; set; }
        public required List<double> With { get; set; }
    }
}
