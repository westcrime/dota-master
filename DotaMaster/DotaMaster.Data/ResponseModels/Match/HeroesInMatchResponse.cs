namespace DotaMaster.Data.ResponseModels.MatchResponses
{
    public class HeroesInMatchResponse
    {
        public required HeroesInMatchDataResponse Data { get; set; }
    }

    public class HeroesInMatchDataResponse
    {
        public required PlayersInMatchResponse Match { get; set; }
    }

    public class PlayersInMatchResponse
    {
        public required List<PlayerHeroesResponse> Players { get; set; }
        public int Rank { get; set; }
    }

    public class PlayerHeroesResponse
    {
        public required string Position { get; set; }
        public int HeroId { get; set; }
        public bool IsRadiant { get; set; }
    }
}
