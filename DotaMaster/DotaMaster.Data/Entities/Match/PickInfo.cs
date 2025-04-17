namespace DotaMaster.Data.Entities.Match
{
    public class PickInfo
    {
        public int HeroId { get; set; }
        public double HeroWinrate { get; set; }
        public required List<HeroWrInfo> HeroWrWithAlliedHeroes { get; set; }
        public required List<HeroWrInfo> HeroWrWithEnemyHeroes { get; set; }
    }

    public class HeroWrInfo
    {
        public double Winrate { get; set; }
        public int HeroId { get; set; }
    }
}
