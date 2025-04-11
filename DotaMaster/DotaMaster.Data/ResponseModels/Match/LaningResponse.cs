namespace DotaMaster.Data.ResponseModels.MatchResponses
{
    public class LaningResponse
    {
        public required List<int> LastHitsPerMinute { get; set; }
        public required List<int> KillEvents { get; set; }
        public required List<int> DeathEvents { get; set; }
        public required List<int> NetworthPerMinute { get; set; }
    }

    public class AvgLaningStatsResponse
    {
        public float Kills { get; set; }
        public float Deaths { get; set; }
        public float Assists { get; set; }
        public float Cs { get; set; }
        public float Xp { get; set; }
        public float Networth { get; set; }
    }
}
