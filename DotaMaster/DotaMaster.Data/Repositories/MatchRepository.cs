using System.Net.Http.Headers;
using System.Text;
using AutoMapper;
using DotaMaster.Data.Entities;
using DotaMaster.Data.Entities.Match;
using DotaMaster.Data.IdConverters;
using DotaMaster.Data.ResponseModels.Match;
using DotaMaster.Data.ResponseModels.MatchResponses;
using DotaMaster.Domain.Exceptions;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DotaMaster.Data.Repositories
{
    public class MatchRepository
    {
        private readonly string _steamApiKey;
        private readonly string _stratzApiKey;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly IMapper _mapper;
        private const string _openDotaUrl = "https://api.opendota.com/api";
        private const string _stratzGraphqlUrl = "https://api.stratz.com/graphql";

        public MatchRepository(IConfiguration configuration, HttpClient httpClient, IMapper mapper)
        {
            _mapper = mapper;
            _httpClient = httpClient;
            _configuration = configuration;
            _steamApiKey = _configuration["Steam:ApiKey"]
                ?? throw new ArgumentNullException("Steam api key is null!");
            _stratzApiKey = _configuration["StratzApiKey"]
                ?? throw new ArgumentNullException("Stratz api key is null!");
        }

        public async Task<AvgHeroStats> GetAvgHeroStats(int duration, int heroId, string rankBracket, string pos)
        {
            const string AdditionalInfoQuery = @"query GetAvgHeroStats($duration: Int, $heroId: Short, $rankBracket: RankBracketBasicEnum, $pos: MatchPlayerPositionType) {
                  heroStats {
                    stats(
                      maxTime: $duration
                      heroIds: [$heroId]
                      bracketBasicIds: [$rankBracket]
                      positionIds: [$pos]
                    ) {
                      topCore
                      topSupport
                      kills
                      deaths
                      assists
                      networth
                      xp
                      cs
                      heroDamage
                      goldFed
                      xpFed
                    }
                  }
                }";
            var requestBody = new
            {
                query = AdditionalInfoQuery,
                variables = new { duration, heroId, rankBracket, pos }
            };
            var response = await SendGraphqlRequest(requestBody);
            var jsonResponse = await response.Content.ReadAsStringAsync();
            var parsed = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonResponse)
                ?? throw new ArgumentNullException("Can not parse GetAvgHeroStats response");

            var avgHeroStatsResponse = (((((JObject)parsed["data"])
                ["heroStats"] ?? throw new BadRequestException("Invalid input data from user"))
                ["stats"] ?? throw new BadRequestException("Invalid input data from user"))
                .First() ?? throw new BadRequestException("Invalid input data from user"))
                .ToObject<AvgHeroStatsResponse>();

            return _mapper.Map<AvgHeroStats>(avgHeroStatsResponse);
        }

        public async Task<UserStats> GetUserStats(string steamId, long matchId)
        {
            var dotaId = SteamIdConverter.SteamIdToDotaId(SteamIdConverter.GetIDFromCommunity(steamId));
            string graphqlQuery = @"
                query GetUserStats($matchId: Long!, $dotaId: Long!) {
                  match(id: $matchId) {
                    players(steamAccountId: $dotaId) {
                      position
                      heroId
                      isRadiant
                      networth
                      kills
                      deaths
                      assists
                      goldPerMinute
                      experiencePerMinute
                      numDenies
                      numLastHits
                      imp
                      stats {
                        impPerMinute
                        itemPurchases {
                          itemId
                          time
                        }
                      }
                    }
                  }
                }";

            var requestBody = new
            {
                query = graphqlQuery,
                variables = new { matchId, dotaId }
            };
            var response = await SendGraphqlRequest(requestBody);
            var jsonResponse = await response.Content.ReadAsStringAsync();
            var parsed = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonResponse)
                ?? throw new ArgumentNullException("Can not parse GetBasicInfoAsync response");

            var userStatsResponse = (((((JObject)parsed["data"])
                ["match"] ?? throw new BadRequestException("Invalid match id or dota id"))
                ["players"] ?? throw new BadRequestException("Invalid match id or dota id"))
                .First ?? throw new BadRequestException("Invalid match id or dota id"))
                .ToObject<UserStatsResponse>();

            return _mapper.Map<UserStats>(userStatsResponse);
        }

        public async Task<MatchInfo> GetMatchInfo(long matchId)
        {
            const string query = @"query GetMatchInfo($matchId: Long!) {
              match(id: $matchId) {
                didRadiantWin
                rank
                durationSeconds
                radiantNetworthLeads
                radiantExperienceLeads
                radiantKills
                direKills
                players {
                  position
                  heroId
                  isRadiant
                  networth
                  kills
                  deaths
                  assists
                  goldPerMinute
                  experiencePerMinute
                  numDenies
                  numLastHits
                  imp
                  item0Id
                  item1Id
                  item2Id
                  item3Id
                  item4Id
                  item5Id
                  backpack0Id
                  backpack1Id
                  backpack2Id
                }
              }
            }";
            var requestBody = new
            {
                query,
                variables = new { matchId }
            };
            var response = await SendGraphqlRequest(requestBody);
            var jsonResponse = await response.Content.ReadAsStringAsync();
            var parsed = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonResponse)
                ?? throw new ArgumentNullException("Can not parse GetMatchInfo response");
            var userStatsResponse = (((((JObject)parsed["data"])
                ["match"] ?? throw new BadRequestException("Invalid match id or dota id"))
                ["players"] ?? throw new BadRequestException("Invalid match id or dota id"))
                .First ?? throw new BadRequestException("Invalid match id or dota id"))
                .ToObject<MatchInfoResponse>();
            return _mapper.Map<MatchInfo>(response);
        }

        public async Task<PickAnalyze> GetPickAnalyzeAsync(long matchId, string steamId, int take = 125)
        {
            var dotaId = SteamIdConverter.SteamIdToDotaId(SteamIdConverter.GetIDFromCommunity(steamId));
            var additionalInfo = await GetInfoAboutUserInMatch(dotaId, matchId)
                ?? throw new InvalidOperationException($"Can't get additional info for match {matchId} for account {dotaId}");

            var (rank, rankBracket) = GetRankInfo(additionalInfo.Data.Match.Rank);
            var heroId = additionalInfo.Data.Match.Players.First().HeroId;
            var position = additionalInfo.Data.Match.Players.First().Position;

            string graphqlUrl = "https://api.stratz.com/graphql";
            string graphqlQuery = @"
                query GetHeroWinrates($heroId: Short, $heroIds: [Short], $take: Int, $rank: RankBracket, $rankBracket: RankBracketBasicEnum, $pos: MatchPlayerPositionType) {
                    heroStats {
                        winWeek(
                            heroIds: [$heroId]
                            gameModeIds: [ALL_PICK_RANKED]
                            bracketIds: [$rank]
                            positionIds: [$pos]
                        ) {
                            matchCount
                            winCount
                        }
                        matchUp(
                            heroId: $heroId
                            heroIds: $heroIds
                            bracketBasicIds: [$rankBracket]
                            take: $take
                        ) {
                            heroId
                            vs {
                                heroId1
                                heroId2
                                winsAverage
                            }
                            with {
                                heroId1
                                heroId2
                                winsAverage
                            }
                        }
                    }
                }";

            var requestBody = new
            {
                query = graphqlQuery,
                variables = new { heroId, rank, rankBracket, take, pos = position }
            };

            var winratesInfo = await SendGraphqlRequest<WinratesResponse>(graphqlUrl, requestBody);

            var heroesInMatchInfo = await GetGeneralMatchInfo(matchId);
            var userIsRadiant = heroesInMatchInfo.Data.Match.Players.Single(p => p.HeroId == heroId).IsRadiant;

            var alliedHeroes = heroesInMatchInfo.Data.Match.Players
                .Where(p => p.IsRadiant == userIsRadiant && p.HeroId != heroId)
                .Select(p => p.HeroId)
                .ToList();

            var enemyHeroes = heroesInMatchInfo.Data.Match.Players
                .Where(p => p.IsRadiant != userIsRadiant)
                .Select(p => p.HeroId)
                .ToList();

            ValidateHeroCounts(alliedHeroes, enemyHeroes);

            var alliedWinrates = alliedHeroes.Select(ally => new HeroWrInfo
            {
                HeroId = ally,
                Winrate = winratesInfo.Data.HeroStats.MatchUp.First().With.Single(h => h.HeroId2 == ally).WinsAverage
            }).ToList();

            var enemyWinrates = enemyHeroes.Select(enemy => new HeroWrInfo
            {
                HeroId = enemy,
                Winrate = winratesInfo.Data.HeroStats.MatchUp.First().Vs.Single(h => h.HeroId2 == enemy).WinsAverage
            }).ToList();

            return new PickAnalyze
            {
                HeroId = heroId,
                HeroWinrate = (double)winratesInfo.Data.HeroStats.WinWeek.Last().WinCount /
                              winratesInfo.Data.HeroStats.WinWeek.Last().MatchCount,
                HeroWrWithAlliedHeroes = alliedWinrates,
                HeroWrWithEnemyHeroes = enemyWinrates
            };
        }

        private static (string rank, string rankBracket) GetRankInfo(int matchRank)
        {
            if (matchRank <= 0)
                return ("UNCALIBRATED", "UNCALIBRATED");

            return matchRank switch
            {
                > 10 and < 20 => ("HERALD", "HERALD_GUARDIAN"),
                >= 20 and < 30 => ("GUARDIAN", "HERALD_GUARDIAN"),
                >= 30 and < 40 => ("CRUSADER", "CRUSADER_ARCHON"),
                >= 40 and < 50 => ("ARCHON", "CRUSADER_ARCHON"),
                >= 50 and < 60 => ("LEGEND", "LEGEND_ANCIENT"),
                >= 60 and < 70 => ("ANCIENT", "LEGEND_ANCIENT"),
                >= 70 and < 80 => ("DIVINE", "DIVINE_IMMORTAL"),
                >= 80 and < 90 => ("IMMORTAL", "DIVINE_IMMORTAL"),
                _ => ("UNKNOWN", "UNKNOWN")
            };
        }

        private void ValidateHeroCounts(List<int> alliedHeroes, List<int> enemyHeroes)
        {
            if (alliedHeroes.Count != 4 || enemyHeroes.Count != 5)
                throw new InvalidOperationException("Wrong number of allied or enemy heroes.");
        }

        public async Task<Laning> GetLaningAsync(string rank, int heroId, string pos, long matchId, string steamId)
        {
            var dotaId = SteamIdConverter.SteamIdToDotaId(SteamIdConverter.GetIDFromCommunity(steamId));

            string graphqlQuery = @"
                query GetLaneAnalyze($matchId: Long!, $pos: [MatchPlayerPositionType], $heroId: Short, $dotaId: Long, $rank: RankBracketBasicEnum) {
                    match(id: $matchId) {
                        players(steamAccountId: $dotaId) {
                            stats {
                                lastHitsPerMinute
                                killEvents { time }
                                deathEvents { time }
                                networthPerMinute
                            }
                        }
                    }
                    heroStats {
                        stats(
                            heroIds: [$heroId]
                            bracketBasicIds: [$rank]
                            maxTime: 10
                            positionIds: $pos
                        ) {
                            kills
                            deaths
                            assists
                            cs
                            xp
                            networth
                        }
                    }
                }";

            var requestBody = new
            {
                query = graphqlQuery,
                variables = new
                {
                    dotaId,
                    matchId,
                    heroId,
                    rank,
                    pos
                }
            };
            var response = await SendGraphqlRequest(requestBody);
            var jsonResponse = await response.Content.ReadAsStringAsync();
            var parsed = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonResponse)
                ?? throw new ArgumentNullException("Can not parse GetLaningAsync response");
            var laningResponse = ((((((JObject)parsed["data"])
                ["match"] ?? throw new BadRequestException("Invalid input data"))
                ["players"] ?? throw new BadRequestException("Invalid input data"))
                .First ?? throw new BadRequestException("Invalid input data"))
                ["stats"] ?? throw new BadRequestException("Invalid input data"))
                .ToObject<LaningResponse>() ?? throw new BadRequestException("Can not parse to LaningResponse");

            var avgLaningResponse = ((((((JObject)parsed["data"])
                ["match"] ?? throw new BadRequestException("Invalid input data"))
                ["heroStats"] ?? throw new BadRequestException("Invalid input data"))
                ["stats"] ?? throw new BadRequestException("Invalid input data"))
                .First ?? throw new BadRequestException("Invalid input data"))
                .ToObject<AvgLaningStatsResponse>() ?? throw new BadRequestException("Can not parse to AvgLaningStatsResponse");

            return new Laning
            {
                AvgLaningCs = avgLaningResponse.Cs,
                AvgLaningDeaths = avgLaningResponse.Deaths,
                AvgLaningKills = avgLaningResponse.Kills,
                AvgLaningNetworth = avgLaningResponse.Networth,
                DotaId = dotaId,
                HeroId = heroId,
                MatchId = matchId.ToString(),
                Position = pos,
                Rank = rank,
                LaningCs = laningResponse.LastHitsPerMinute.Take(10).Sum(),
                LaningNetworth = laningResponse.NetworthPerMinute[9],
                LaningDeaths = laningResponse.DeathEvents.Count(d => d < 600),
                LaningKills = laningResponse.KillEvents.Count(k => k < 600)
            };
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
