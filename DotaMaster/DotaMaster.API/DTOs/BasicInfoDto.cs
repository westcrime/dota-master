namespace DotaMaster.API.DTOs
{
    public record BasicInfoDto(DateOnly FirstMatchDate, string Rank, int Loses, int Wins, bool IsDotaPlusSub);
}
