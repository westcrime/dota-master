namespace DotaMaster.Application.Models.Profile
{
    public record HeroStatModel(
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
