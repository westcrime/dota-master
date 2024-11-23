namespace DotaMaster.API.DTOs
{
    public record BasicInfoDto(string SteamId, string DotaId, string Rank, int Loses, int Wins, bool IsDotaPlusSub);
}
