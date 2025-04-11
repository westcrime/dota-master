namespace DotaMaster.Data.ResponseModels.Match
{
    public class MatchInfoResponse
    {
        public bool DidRadiantWin { get; set; }
        public int Rank { get; set; }
        public int DurationSeconds { get; set; }
        public required List<int> RadiantNetworthLeads { get; set; }
        public required List<int> RadiantExperienceLeads { get; set; }
        public required List<int> RadiantKills { get; set; }
        public required List<int> DireKills { get; set; }
        public required List<Player> Players { get; set; }
        public class Player
        {
            public required string Position { get; set; }
            public int HeroId { get; set; }
            public bool IsRadiant { get; set; }
            public int Networth { get; set; }
            public int Kills { get; set; }
            public int Deaths { get; set; }
            public int Assists { get; set; }
            public int GoldPerMinute { get; set; }
            public int ExperiencePerMinute { get; set; }
            public int NumDenies { get; set; }
            public int NumLastHits { get; set; }
            public int Imp { get; set; }
            public int? Item0Id { get; set; }
            public int? Item1Id { get; set; }
            public int? Item2Id { get; set; }
            public int? Item3Id { get; set; }
            public int? Item4Id { get; set; }
            public int? Item5Id { get; set; }
            public int? Backpack0Id { get; set; }
            public int? Backpack1Id { get; set; }
            public int? Backpack2Id { get; set; }
        }
    }
}
