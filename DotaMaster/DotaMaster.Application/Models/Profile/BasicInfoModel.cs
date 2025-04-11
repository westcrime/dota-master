namespace DotaMaster.Application.Models.Profile
{
    public record BasicInfoModel(DateOnly FirstMatchDate, string Rank, int Loses, int Wins, bool IsDotaPlusSub);
}
