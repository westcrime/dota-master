using DotaMaster.Data.Entities.Match;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace DotaMaster.Data.Contexts
{
    public class MatchDbContext
    {
        private readonly IMongoCollection<MatchEntity> _matches;

        public MatchDbContext(IMongoClient client)
        {
            var database = client.GetDatabase("DotaMasterDB");
            _matches = database.GetCollection<MatchEntity>("matches");
        }

        public async Task CreateMatchAsync(MatchEntity match)
        {
            await _matches.InsertOneAsync(match);
        }

        public async Task<MatchEntity?> GetMatchAsync(long matchId, long dotaId)
        {
            return await _matches.Find(m => m.MatchId == matchId && m.DotaId == dotaId).FirstOrDefaultAsync();
        }
    }
}
