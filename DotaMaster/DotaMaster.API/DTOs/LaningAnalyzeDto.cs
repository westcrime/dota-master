namespace DotaMaster.API.DTOs
{
    public record LaningAnalyzeDto(
        string MatchId,
        string Position,
        string Rank,
        int HeroId,
        string DotaId,
        int LaningCs,
        double AvgLaningCs,
        int LaningKills,
        double AvgLaningKills,
        int LaningDeaths,
        double AvgLaningDeaths,
        int LaningNetworth,
        double AvgLaningNetworth);
}
