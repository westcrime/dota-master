namespace DotaMaster.API.DTOs
{
    public record HeroStatDto(
        int HeroId,
        string Name,
        int MatchCount,
        int WinCount,
        double AvgKills,
        double AvgDeaths,
        double AvgAssists,
        double AvgGpm,
        double AvgXpm,
        double Impact);
}
