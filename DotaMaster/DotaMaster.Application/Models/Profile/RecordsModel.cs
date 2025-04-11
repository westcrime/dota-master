namespace DotaMaster.Application.Models.Profile
{
    public record RecordsModel(
        long Kills,
        long AvgKills,
        long Deaths,
        long AvgDeaths,
        long Assists,
        long AvgAssists,
        long Gold,
        long AvgGold,
        long Xp,
        long AvgXp,
        long LastHits,
        long AvgLastHits,
        long Denies,
        long AvgDenies,
        long HeroDamage,
        long AvgHeroDamage,
        long TowerDamage,
        long AvgTowerDamage,
        long HeroHealing,
        long AvgHeroHealing);
}
