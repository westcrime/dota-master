namespace DotaMaster.Data.Entities.Profile
{
    public class SteamProfile
    {
        public required string DotaId { get; set; }
        public required string SteamId { get; set; }
        public required string Username { get; set; }
        public required string AvatarUrl { get; set; }
    }
}
