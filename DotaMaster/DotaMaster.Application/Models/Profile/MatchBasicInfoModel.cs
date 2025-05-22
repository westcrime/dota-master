namespace DotaMaster.Application.Models.Profile
{
    public record MatchBasicInfoModel(
        string MatchId,
        bool IsWin,
        TimeSpan Duration,
        DateTime StartTime,
        HeroModel Hero,
        int Kills,
        int Deaths,
        int AverageRank,
        int Assists);
}
