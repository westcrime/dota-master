using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Application.Models
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
