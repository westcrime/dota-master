namespace DotaMaster.Data.ResponseModels.Match
{
    public class WinratesResponse
    {
        public required List<WinWeek> WinWeek { get; set; }
        public required List<MatchUp> MatchUp { get; set; }
    }

    public class WinWeek
    {
        public int MatchCount { get; set; }
        public int WinCount { get; set; }
    }

    public class MatchUp
    {
        public int HeroId { get; set; }
        public required List<MatchUpInfo> Vs { get; set; }
        public required List<MatchUpInfo> With { get; set; }
    }

    public class MatchUpInfo
    {
        public int HeroId1 { get; set; }
        public int HeroId2 { get; set; }
        public double WinsAverage { get; set; }
    }

}
