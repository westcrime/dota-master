namespace DotaMaster.Data.Entities.Profile
{
    public class BasicInfo
    {
        public required string Rank { get; set; }
        public required int Loses { get; set; }
        public required int Wins { get; set; }
        public required bool IsDotaPlusSub { get; set; }
        public required DateOnly FirstMatchDate { get; set; }
    }
}
