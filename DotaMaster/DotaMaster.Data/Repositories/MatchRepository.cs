using AutoMapper;
using DotaMaster.Data.Entities;
using DotaMaster.Data.IdConverters;
using DotaMaster.Data.ResponseModels.MatchResponses;
using DotaMaster.Data.ResponseModels.ProfileResponses;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace DotaMaster.Data.Repositories
{
    public class MatchRepository
    {
        private readonly string _steamApiKey;
        private readonly string _stratzApiKey;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly IMapper _mapper;

        public MatchRepository(IConfiguration configuration, HttpClient httpClient, IMapper mapper)
        {
            _mapper = mapper;
            _httpClient = httpClient;
            _configuration = configuration;
            _steamApiKey = _configuration["Steam:ApiKey"];
            _stratzApiKey = _configuration["StratzApiKey"];
        }

        private async Task<HeroesInMatchInfoResponse> GetHeroesInMatch(long matchId)
        {
            const string GraphqlUrl = "https://api.stratz.com/graphql";
            const string HeroesInMatchInfoQuery = @"
                query GetUser($matchId: Long!) {
                    match(id: $matchId) {
                        players {
                            position
                            heroId
                            isRadiant
                        }
                        rank
                    }
                }";

            // Формирование тела запроса
            var requestBody = new
            {
                query = HeroesInMatchInfoQuery,
                variables = new { matchId }
            };

            // Сериализация тела запроса в JSON
            string jsonRequestBody = JsonConvert.SerializeObject(requestBody);

            using var httpRequest = new HttpRequestMessage(HttpMethod.Post, GraphqlUrl)
            {
                Content = new StringContent(jsonRequestBody, Encoding.UTF8, "application/json")
            };

            // Добавление заголовков
            httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _stratzApiKey);
            httpRequest.Headers.UserAgent.ParseAdd("STRATZ_API");

            // Отправка запроса
            using var response = await _httpClient.SendAsync(httpRequest);

            // Проверка успешности ответа
            if (!response.IsSuccessStatusCode)
            {
                string errorContent = await response.Content.ReadAsStringAsync();
                throw new HttpRequestException($"Request failed with status {response.StatusCode}: {errorContent}");
            }

            // Чтение и десериализация ответа
            string responseContent = await response.Content.ReadAsStringAsync();
            var heroesInMatchInfo = JsonConvert.DeserializeObject<HeroesInMatchInfoResponse>(responseContent);

            if (heroesInMatchInfo == null)
            {
                throw new InvalidOperationException($"Received null response for match ID {matchId}.");
            }

            return heroesInMatchInfo;
        }

        private async Task<AdditionalInfoResponse> GetInfoAboutUserInMatch(long dotaId, long matchId)
        {
            const string GraphqlUrl = "https://api.stratz.com/graphql";
            const string AdditionalInfoQuery = @"
                query GetUser($matchId: Long!, $dotaId: Long) {
                    match(id: $matchId) {
                        players(steamAccountId: $dotaId) {
                            position
                            heroId
                        }
                        rank
                        durationSeconds
                    }
                }";

            // Формирование тела запроса
            var requestBody = new
            {
                query = AdditionalInfoQuery,
                variables = new { dotaId, matchId }
            };

            // Сериализация тела запроса в JSON
            string jsonRequestBody = JsonConvert.SerializeObject(requestBody);

            using var httpRequest = new HttpRequestMessage(HttpMethod.Post, GraphqlUrl)
            {
                Content = new StringContent(jsonRequestBody, Encoding.UTF8, "application/json")
            };

            // Добавление заголовков
            httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _stratzApiKey);
            httpRequest.Headers.UserAgent.ParseAdd("STRATZ_API");

            // Отправка запроса
            using var response = await _httpClient.SendAsync(httpRequest);

            // Проверка успешности ответа
            if (!response.IsSuccessStatusCode)
            {
                string errorContent = await response.Content.ReadAsStringAsync();
                throw new HttpRequestException($"Request failed with status {response.StatusCode}: {errorContent}");
            }

            // Десериализация ответа
            string responseContent = await response.Content.ReadAsStringAsync();
            var additionalInfo = JsonConvert.DeserializeObject<AdditionalInfoResponse>(responseContent);

            if (additionalInfo == null)
            {
                throw new InvalidOperationException($"Additional info for match ID {matchId} is null.");
            }

            return additionalInfo;
        }

        private async Task<AvgHeroPerfomanceResponse> GetAvgHeroPerfomance(int duration, int heroId, string rankBracket, string pos)
        {
            const string GraphqlUrl = "https://api.stratz.com/graphql";
            const string AdditionalInfoQuery = @"query GetStats($duration: Int, $heroId: Short, $rankBracket: RankBracketBasicEnum, $pos: MatchPlayerPositionType) {
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

            // Формирование тела запроса
            var requestBody = new
            {
                query = AdditionalInfoQuery,
                variables = new { duration, heroId, rankBracket, pos }
            };

            // Сериализация тела запроса в JSON
            string jsonRequestBody = JsonConvert.SerializeObject(requestBody);

            using var httpRequest = new HttpRequestMessage(HttpMethod.Post, GraphqlUrl)
            {
                Content = new StringContent(jsonRequestBody, Encoding.UTF8, "application/json")
            };

            // Добавление заголовков
            httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _stratzApiKey);
            httpRequest.Headers.UserAgent.ParseAdd("STRATZ_API");

            // Отправка запроса
            using var response = await _httpClient.SendAsync(httpRequest);

            // Проверка успешности ответа
            if (!response.IsSuccessStatusCode)
            {
                string errorContent = await response.Content.ReadAsStringAsync();
                throw new HttpRequestException($"Request failed with status {response.StatusCode}: {errorContent}");
            }

            // Десериализация ответа
            string responseContent = await response.Content.ReadAsStringAsync();
            var additionalInfo = JsonConvert.DeserializeObject<AvgHeroPerfomanceResponse>(responseContent);

            if (additionalInfo == null)
            {
                throw new InvalidOperationException($"Additional info for hero ID {heroId} is null.");
            }

            return additionalInfo;
        }

        public async Task<GeneralHeroPerfomance> GetUserPerfomance(string steamId, long matchId)
        {
            if (matchId <= 0)
                throw new ArgumentException("Match ID must be greater than zero.", nameof(matchId));

            if (string.IsNullOrWhiteSpace(steamId))
                throw new ArgumentException("Steam ID cannot be null or empty.", nameof(steamId));

            string dotaId = SteamIdConverter.SteamIdToDotaId(SteamIdConverter.GetIDFromCommunity(steamId));
            var additionalInfo = await GetInfoAboutUserInMatch(long.Parse(dotaId), matchId)
                ?? throw new InvalidOperationException($"Can't get additional info for match {matchId} for account {dotaId}");

            var (rank, rankBracket) = GetRankInfo(additionalInfo.Data.Match.Rank);
            var duration = additionalInfo.Data.Match.DurationSeconds / 60.0;
            var heroId = additionalInfo.Data.Match.Players.First().HeroId;
            var position = additionalInfo.Data.Match.Players.First().Position;

            var avgHeroPerfomance = await GetAvgHeroPerfomance((int)duration, heroId, rankBracket, position);

            string graphqlUrl = "https://api.stratz.com/graphql";
            string graphqlQuery = @"
                query GetUser($matchId: Long!, $userId: Long!) {
                  match(id: $matchId) {
                    players(steamAccountId: $userId) {
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
                    }
                  }
                }";

            var requestBody = new
            {
                query = graphqlQuery,
                variables = new { matchId, userId = long.Parse(dotaId) }
            };

            var perfomanceInfo = await SendGraphqlRequest<PerfomanceResponse>(graphqlUrl, requestBody);

            var generalHeroPerfomance = new GeneralHeroPerfomance()
            {
                AvgHeroPerfomance = _mapper.Map<AvgHeroPerfomance>(avgHeroPerfomance.Data.HeroStats.Stats.First()),
                PlayerPerfomance = _mapper.Map<HeroPlayerPerfomance>(perfomanceInfo.Data.Match.Players.First())
            };
            return generalHeroPerfomance;
        }

        public async Task<MatchInfo> GetMatchInfo(long matchId)
        {
            string GraphqlUrl = "https://api.stratz.com/graphql";
            const string MatchInfoQuery = @"query GetUser($matchId: Long!) {
              match(id: $matchId) {
                didRadiantWin
                rank
                durationSeconds
                radiantNetworthLeads
                radiantExperienceLeads
                radiantKills
                direKills
                players {
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

            // Формирование тела запроса
            var requestBody = new
            {
                query = MatchInfoQuery,
                variables = new { matchId }
            };

            // Сериализация тела запроса в JSON
            string jsonRequestBody = JsonConvert.SerializeObject(requestBody);

            using var httpRequest = new HttpRequestMessage(HttpMethod.Post, GraphqlUrl)
            {
                Content = new StringContent(jsonRequestBody, Encoding.UTF8, "application/json")
            };

            // Добавление заголовков
            httpRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _stratzApiKey);
            httpRequest.Headers.UserAgent.ParseAdd("STRATZ_API");

            // Отправка запроса
            using var response = await _httpClient.SendAsync(httpRequest);

            // Проверка успешности ответа
            if (!response.IsSuccessStatusCode)
            {
                string errorContent = await response.Content.ReadAsStringAsync();
                throw new HttpRequestException($"Request failed with status {response.StatusCode}: {errorContent}");
            }

            // Десериализация ответа
            string responseContent = await response.Content.ReadAsStringAsync();

            var matchInfo = JsonConvert.DeserializeObject<GeneralMatchInfoResponse>(responseContent);

            if (matchInfo == null)
            {
                throw new InvalidOperationException($"General match info for match ID {matchId} is null.");
            }

            return _mapper.Map<MatchInfo>(matchInfo.Data.Match);
        }

        public async Task<PickAnalyze> GetPickAnalyzeAsync(long matchId, string steamId, int take = 125)
        {
            if (matchId <= 0)
                throw new ArgumentException("Match ID must be greater than zero.", nameof(matchId));

            if (string.IsNullOrWhiteSpace(steamId))
                throw new ArgumentException("Steam ID cannot be null or empty.", nameof(steamId));

            string dotaId = SteamIdConverter.SteamIdToDotaId(SteamIdConverter.GetIDFromCommunity(steamId));
            var additionalInfo = await GetInfoAboutUserInMatch(long.Parse(dotaId), matchId)
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

            var heroesInMatchInfo = await GetHeroesInMatch(matchId);
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
                HeroWinrate = (double)winratesInfo.Data.HeroStats.WinWeek.Last().WinCount /
                              winratesInfo.Data.HeroStats.WinWeek.Last().MatchCount,
                HeroWrWithAlliedHeroes = alliedWinrates,
                HeroWrWithEnemyHeroes = enemyWinrates
            };
        }

        private (string rank, string rankBracket) GetRankInfo(int matchRank)
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

        public async Task<LaningAnalyze> GetLaningAnalyzeAsync(long matchId, string steamId)
        {
            string dotaId = SteamIdConverter.SteamIdToDotaId(SteamIdConverter.GetIDFromCommunity(steamId));
            var additionalInfo = await GetInfoAboutUserInMatch(long.Parse(dotaId), matchId)
                ?? throw new InvalidOperationException($"Cannot get additional info for match {matchId} for account {dotaId}.");

            var playerInfo = additionalInfo.Data.Match.Players.First()
                ?? throw new InvalidOperationException("Player information not found in the match data.");

            string rank = GetRank(additionalInfo.Data.Match.Rank);

            string graphqlQuery = @"
                query GetLaneAnalyze($matchId: Long!, $pos: [MatchPlayerPositionType], $heroId: [Short], $dotaId: Long, $rank: RankBracketBasicEnum) {
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
                            heroIds: $heroId
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
                    dotaId = long.Parse(dotaId),
                    matchId,
                    heroId = new[] { playerInfo.HeroId },
                    rank,
                    pos = playerInfo.Position
                }
            };

            var laningInfo = await SendGraphqlRequest<LaningResponse>("https://api.stratz.com/graphql", requestBody)
                ?? throw new InvalidOperationException($"Cannot get laning info for match {matchId}.");

            var stats = laningInfo.Data.HeroStats.Stats.First();
            var playerStats = laningInfo.Data.Match.Players.First().Stats;

            return new LaningAnalyze
            {
                AvgLaningCs = stats.Cs,
                AvgLaningDeaths = stats.Deaths,
                AvgLaningKills = stats.Kills,
                AvgLaningNetworth = stats.Networth,
                DotaId = dotaId,
                HeroId = playerInfo.HeroId,
                MatchId = matchId.ToString(),
                Position = playerInfo.Position,
                Rank = rank,
                LaningCs = playerStats.LastHitsPerMinute.Take(10).Sum(),
                LaningNetworth = playerStats.NetworthPerMinute[9],
                LaningDeaths = playerStats.DeathEvents.Count(d => d.Time < 600),
                LaningKills = playerStats.KillEvents.Count(k => k.Time < 600)
            };
        }

        private string GetRank(int matchRank)
        {
            return matchRank switch
            {
                <= 0 => "UNCALIBRATED",
                > 10 and < 30 => "HERALD_GUARDIAN",
                >= 30 and < 50 => "CRUSADER_ARCHON",
                >= 50 and < 70 => "LEGEND_ANCIENT",
                >= 70 and < 90 => "DIVINE_IMMORTAL",
                _ => "UNKNOWN"
            };
        }

        private async Task<T> SendGraphqlRequest<T>(string url, object requestBody)
        {
            var jsonBody = JsonConvert.SerializeObject(requestBody);
            var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

            using var request = new HttpRequestMessage(HttpMethod.Post, url) { Content = content };
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _stratzApiKey);
            request.Headers.UserAgent.ParseAdd("STRATZ_API");

            using var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            string responseContent = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<T>(responseContent)
                   ?? throw new InvalidOperationException("Deserialized response is null.");
        }

    }
}
