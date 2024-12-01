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
        string? CsAdvice,
        int LaningKills,
        double AvgLaningKills,
        int LaningDeaths,
        double AvgLaningDeaths,
        string? KdaAdvice,
        int LaningNetworth,
        double AvgLaningNetworth,
        string? NetworthAdvice);
}
