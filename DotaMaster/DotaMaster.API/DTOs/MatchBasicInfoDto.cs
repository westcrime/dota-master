namespace DotaMaster.API.DTOs
{
    public record MatchBasicInfoDto(
        string MatchId,
        bool IsWin,
        TimeSpan Duration,
        int HeroId,
        int Kills,
        int Deaths,
        int Assists);
}
