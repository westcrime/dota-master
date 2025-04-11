namespace DotaMaster.Data.Entities.Match
{
    public class Laning
    {
        public required string MatchId { get; set; }
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
}
