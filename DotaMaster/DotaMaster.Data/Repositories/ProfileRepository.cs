using DotaMaster.Data.Entities.Profile;
using DotaMaster.Domain.Services;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;
using System.Text;
using DotaMaster.Data.ResponseModels.Profile;

namespace DotaMaster.Data.Repositories
{
    public class ProfileRepository
    {
        private readonly string _steamApiKey;
        private readonly string _stratzApiKey;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private const string _openDotaUrl = "https://api.opendota.com/api";
        private const string _stratzGraphqlUrl = "https://api.stratz.com/graphql";

        public ProfileRepository(IConfiguration configuration, HttpClient httpClient)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _steamApiKey = _configuration["Steam:ApiKey"]
                ?? throw new ArgumentNullException("Steam api key is null!");
            _stratzApiKey = _configuration["StratzApiKey"]
                ?? throw new ArgumentNullException("Stratz api key is null!");
        }

        public async Task<SteamProfile> GetSteamUserProfileAsync(string steamId)
        {
            string url = $"https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key={_steamApiKey}&steamids={steamId}";
            var dotaId = SteamIdConverter.SteamIdToDotaId(SteamIdConverter.GetIDFromCommunity(steamId));
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            var jsonResponse = await response.Content.ReadAsStringAsync();
            var parsed = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonResponse)
                ?? throw new ArgumentNullException("Can not parse GetSteamUserProfileAsync response");
            var player = ((((JObject)parsed["response"]
                ?? throw new ArgumentNullException("Can not parse GetSteamUserProfileAsync response: 'response' is null"))
                ["players"] 
                ?? throw new ArgumentNullException("Can not parse GetSteamUserProfileAsync response: 'players' is null"))
                .ToObject<Player[]>()
                ?? throw new ArgumentNullException("Can not parse GetSteamUserProfileAsync response: can not parse to 'Player'"))[0];
            return new SteamProfile()
            {
                AvatarUrl = player.AvatarUrl,
                DotaId = dotaId,
                SteamId = player.SteamId,
                Username = player.Username
            };
        }

        public async Task<BasicInfo> GetBasicInfoAsync(string steamId)
        {
            var dotaId = SteamIdConverter.SteamIdToDotaId(SteamIdConverter.GetIDFromCommunity(steamId));
            const string query = @"
                query BasicInfoQuery($dotaId: Long!) {
                  player(steamAccountId: $dotaId) {
                    steamAccount {
                      seasonRank
                    }
                    matchCount
                    firstMatchDate
                    winCount
                    matchCount
                    isFollowed
                  }
                }";

            var requestBody = new
            {
                query,
                variables = new { dotaId }
            };
            var response = await SendGraphqlRequest(requestBody);
            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();
            var parsed = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonResponse)
                ?? throw new ArgumentNullException("Can not parse GetBasicInfoAsync response");
            var basicInfoResponse = ((((JObject)parsed["data"])
                ?? throw new ArgumentNullException("Can not parse GetBasicInfoAsync response: 'data' is null"))
                ["player"]
                ?? throw new ArgumentNullException("Can not parse GetBasicInfoAsync response: 'player' is null"))
                .ToObject<BasicInfoResponse>()
                ?? throw new ArgumentNullException("Can not parse GetBasicInfoAsync response: can not parse to 'BasicInfoResponse'");

            return new BasicInfo()
            {
                FirstMatchDate = DateOnly.FromDateTime(DateTimeOffset.FromUnixTimeSeconds(basicInfoResponse.FirstMatchDate).UtcDateTime),
                IsDotaPlusSub = basicInfoResponse.IsDotaPlusSub,
                Loses = basicInfoResponse.MatchCount - basicInfoResponse.Wins,
                Rank = basicInfoResponse.SteamAccount.SeasonRank.ToString(),
                Wins = basicInfoResponse.Wins
            };
        }

        public async Task<Records> GetRecordsAsync(string steamId)
        {
            var dotaId = SteamIdConverter.SteamIdToDotaId(SteamIdConverter.GetIDFromCommunity(steamId));
            string url = $"{_openDotaUrl}/players/{dotaId}/totals";
            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            var recordsResponse = JsonConvert.DeserializeObject<RecordsResponse[]>(await response.Content.ReadAsStringAsync())
                ?? throw new ArgumentNullException("Can not parse GetRecordsAsync response");

            var records = new Records();

            foreach (var record in recordsResponse)
            {
                if (record.Field == "kills")
                {
                    records.Kills = record.TotalCount;
                    records.AvgKills = (int)Math.Ceiling(record.TotalCount / (double)record.Matches);
                }
                else if (record.Field == "deaths")
                {
                    records.Deaths = record.TotalCount;
                    records.AvgDeaths = (int)Math.Ceiling(record.TotalCount / (double)record.Matches);
                }
                else if (record.Field == "assists")
                {
                    records.Assists = record.TotalCount;
                    records.AvgAssists = (int)Math.Ceiling(record.TotalCount / (double)record.Matches);
                }
                else if (record.Field == "gold_per_min")
                {
                    records.Gold = record.TotalCount;
                    records.AvgGold = (int)Math.Ceiling(record.TotalCount / (double)record.Matches);
                }
                else if (record.Field == "xp_per_min")
                {
                    records.Xp = record.TotalCount;
                    records.AvgXp = (int)Math.Ceiling(record.TotalCount / (double)record.Matches);
                }
                else if (record.Field == "last_hits")
                {
                    records.LastHits = record.TotalCount;
                    records.AvgLastHits = (int)Math.Ceiling(record.TotalCount / (double)record.Matches);
                }
                else if (record.Field == "denies")
                {
                    records.Denies = record.TotalCount;
                    records.AvgDenies = (int)Math.Ceiling(record.TotalCount / (double)record.Matches);
                }
                else if (record.Field == "hero_damage")
                {
                    records.HeroDamage = record.TotalCount;
                    records.AvgHeroDamage = (int)Math.Ceiling(record.TotalCount / (double)record.Matches);
                }
                else if (record.Field == "tower_damage")
                {
                    records.TowerDamage = record.TotalCount;
                    records.AvgTowerDamage = (int)Math.Ceiling(record.TotalCount / (double)record.Matches);
                }
                else if (record.Field == "hero_healing")
                {
                    records.HeroHealing = record.TotalCount;
                    records.AvgHeroHealing = (int)Math.Ceiling(record.TotalCount / (double)record.Matches);
                }
            }
            return records;
        }

        public async Task<IEnumerable<HeroStat>> GetRecentHeroesStatsAsync(string steamId)
        {
            var dotaId = SteamIdConverter.SteamIdToDotaId(SteamIdConverter.GetIDFromCommunity(steamId));
            string recentMatchesUrl = $"{_openDotaUrl}/players/{dotaId}/recentMatches";
            var recentMatchesResponse = await _httpClient.GetAsync(recentMatchesUrl);
            var recentMatches = JsonConvert.DeserializeObject<RecentMatchIdResponse[]>(await recentMatchesResponse.Content.ReadAsStringAsync())
                ?? throw new ArgumentNullException($"Profile {steamId} is private!");

            string query = @"
                query GetUser($userId: Long!, $matchIds: [Long]) {
                  player(steamAccountId: $userId) {
                    heroesPerformance(request: {matchIds: $matchIds}) {
                      heroId
                      hero {
                        name
                      }
                      matchCount
                      avgKills
                      avgDeaths
                      duration
                      avgAssists
                      goldPerMinute
                      experiencePerMinute
                      winCount
                      imp
                      best
                      positionScore {
                        score
                        matchCount
                        imp
                      }
                    }
                  }
                }";

            var matchIds = recentMatches.Select(match => match.MatchId).ToArray();
            var requestBody = new
            {
                query,
                variables = new { userId = dotaId, matchIds }
            };
            var response = await SendGraphqlRequest(requestBody);
            response.EnsureSuccessStatusCode();
            var responseContent = await response.Content.ReadAsStringAsync();

            var heroStatsResponse = JsonConvert.DeserializeObject<HeroStatsResponse>(responseContent)
                ?? throw new ArgumentNullException("Can not parse GetRecentHeroesStatsAsync response: response is null");

            return heroStatsResponse.Data.Player.HeroStats.Select(heroStat => new HeroStat
            {
                HeroId = heroStat.HeroId,
                Name = heroStat.Hero.Name,
                MatchCount = heroStat.MatchCount,
                WinCount = heroStat.WinCount,
                AvgAssists = heroStat.AvgAssists,
                AvgDeaths = heroStat.AvgDeaths,
                AvgKills = heroStat.AvgKills,
                AvgGpm = heroStat.Gpm,
                AvgXpm = heroStat.Xpm,
                Impact = heroStat.Impact
            }).ToList();
        }

        public async Task<IEnumerable<MatchBasicInfo>> GetMatchesInfoAsync(string steamId, int limit = 15, int offset = 0)
        {
            var dotaId = SteamIdConverter.SteamIdToDotaId(SteamIdConverter.GetIDFromCommunity(steamId));
            string url = $"{_openDotaUrl}/{dotaId}/matches?game_mode=22&limit={limit}&offset={offset}";

            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var matchesJson = await response.Content.ReadAsStringAsync();
            var matches = JsonConvert.DeserializeObject<MatchBasicInfoResponse[]>(matchesJson)
                ?? throw new ArgumentNullException("Can not parse GetMatchesInfoAsync response: response is null"); ;

            return matches.Select(match => new MatchBasicInfo
            {
                MatchId = match.MatchId,
                HeroId = match.HeroId,
                IsWin = match.PlayerSlot < 100? match.RadiantWin : !match.RadiantWin,
                Duration = TimeSpan.FromSeconds(match.Duration),
                Kills = match.Kills,
                Deaths = match.Deaths,
                Assists = match.Assists
            }).ToList();
        }

        private async Task<HttpResponseMessage> SendGraphqlRequest(object requestBody)
        {
            string jsonRequestBody = JsonConvert.SerializeObject(requestBody);
            var httpRequest = new HttpRequestMessage(HttpMethod.Post, _stratzGraphqlUrl)
            {
                Content = new StringContent(jsonRequestBody, Encoding.UTF8, "application/json")
            };
            httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _stratzApiKey);
            httpRequest.Headers.UserAgent.ParseAdd("STRATZ_API");
            return await _httpClient.SendAsync(httpRequest);
        }
    }
}
