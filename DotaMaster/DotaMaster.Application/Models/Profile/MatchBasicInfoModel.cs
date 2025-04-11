namespace DotaMaster.Application.Models.Profile
{
    public record MatchBasicInfoModel(
        string MatchId,
        bool IsWin,
        TimeSpan Duration,
        int HeroId,
        int Kills,
        int Deaths,
        int Assists);
}
