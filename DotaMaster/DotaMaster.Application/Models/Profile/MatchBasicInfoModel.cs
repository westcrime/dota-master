namespace DotaMaster.Application.Models.Profile
{
    public record MatchBasicInfoModel(
        string MatchId,
        bool IsWin,
        TimeSpan Duration,
        DateTime StartTime,
        int Skill,
        int HeroId,
        int Kills,
        int Deaths,
        int Assists);
}
