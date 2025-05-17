using System.Text;
using AutoMapper;
using DotaMaster.Application.Models.Match;
using DotaMaster.Data.Entities.Match;
using DotaMaster.Data.Repositories;
using DotaMaster.Domain.Services;
using Newtonsoft.Json;

namespace DotaMaster.Application.Services
{
    public class MatchService(MatchRepository matchRepository, ItemRepository itemRepository, HeroRepository heroRepository, IMapper mapper, AiRepository aiRepository)
    {
        private const string template = "Ответь на русском. Используй английский для названия героев, не переводи их на русский. Не используй специальные знаки для декорации текста, только сплошной текст. Обращение от 2 лица к игроку. Максмальная длина - до 100 слов. Дай также советы чтобы улучшить этот аспект.";
        private readonly MatchRepository _matchRepository = matchRepository;
        private readonly ItemRepository _itemRepository = itemRepository;
        private readonly HeroRepository _heroRepository = heroRepository;
        private readonly AiRepository _aiRepository = aiRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<MatchModel> Get(string steamId, string matchId)
        {
            var dotaId = SteamIdConverter.SteamIdToDotaId(SteamIdConverter.GetIDFromCommunity(steamId));
            var longMatchId = long.Parse(matchId);

            var matchEntity = await _matchRepository.GetMatch(longMatchId, dotaId);
            if (matchEntity != null)
            {
                return _mapper.Map<MatchModel>(matchEntity);
            }
            var generalInfo = await _matchRepository.GetMatchInfo(longMatchId);
            var userStats = await _matchRepository.GetUserStats(dotaId, longMatchId);
            var (rank, rankBracket) = GetRank(generalInfo.Rank);
            var (alliedHeroIds, enemyHeroIds) = GetEnemiesAndAllies(generalInfo, userStats.HeroId);
            var avgHeroStats = await _matchRepository.GetAvgHeroStats(
                generalInfo.DurationSeconds / 60,
                (generalInfo.DurationSeconds / 60) - 1,
                userStats.HeroId, 
                rankBracket,
                userStats.Position);
            var laning = await _matchRepository.GetLaningAsync(rankBracket, userStats.HeroId, userStats.Position, longMatchId, dotaId);
            var picks = await _matchRepository.GetPickAsync(rank, rankBracket, dotaId, userStats.HeroId, userStats.Position, alliedHeroIds!, enemyHeroIds!);

            StringBuilder aiRequest = new StringBuilder();
            aiRequest.Append(JsonConvert.SerializeObject((await _itemRepository.GetAllItemsAsync()).Select(i => $"{i.Id} {i.Title}"), Formatting.Indented));
            aiRequest.Append(JsonConvert.SerializeObject((await _heroRepository.GetHeroes()).Select(h => $"{h.Id} {h.DisplayName}"), Formatting.Indented));
            aiRequest.Append(JsonConvert.SerializeObject(generalInfo, Formatting.Indented));
            aiRequest.Append(JsonConvert.SerializeObject(userStats, Formatting.Indented));
            aiRequest.Append(JsonConvert.SerializeObject(avgHeroStats, Formatting.Indented));
            aiRequest.Append(JsonConvert.SerializeObject(picks, Formatting.Indented));
            aiRequest.Append(JsonConvert.SerializeObject(laning, Formatting.Indented));
            aiRequest.Append(template);

            StringBuilder aiPickRequest = new StringBuilder(aiRequest.ToString());
            aiPickRequest.Append("Дай анализ пика героя для игрока, исходя из информации объектов. Не затрагивай другие аспекты, только Пики. Постарайся кратко объяснить причину либо очень низкого или высокого винрейта против/за некоторых героев.");
            var pickAdvice = await _aiRepository.AskAi(aiPickRequest.ToString());

            StringBuilder aiLaningRequest = new StringBuilder(aiRequest.ToString());
            aiLaningRequest.Append("Дай анализ лайнинга игрока, исходя из информации объектов. Не затрагивай другие аспекты, только Лайнинг. При генерации совета, обрати внимания на героев с которыми на лайне стоял игрок и героев против которых он стоял. Исходя из этой информации дай совет как улучшить лайнинг игрока, если в нем есть проблемы.");
            var laningAdvice = await _aiRepository.AskAi(aiLaningRequest.ToString());

            StringBuilder aiItemsRequest = new StringBuilder(aiRequest.ToString());
            aiItemsRequest.Append("Дай анализ покупки предметов героя для игрока, исходя из информации объектов (времени приобретения (переврди в минуты и секунды время) и героев против и за игрока). Не затрагивай другие аспекты, только Предметы и их актуальность. Дай краткий совет, если есть вариант получше из предметов против героев противника.");
            var itemsAdvice = await _aiRepository.AskAi(aiItemsRequest.ToString());

            var laningMatchModel = _mapper.Map<Models.Match.Laning>(laning);
            var generalInfoMatchModel = _mapper.Map<GeneralInfo>(generalInfo);
            laningMatchModel.LaneAlliesHeroIds = GetLaneAllies(userStats.Position, userStats.IsRadiant, generalInfoMatchModel);
            laningMatchModel.LaneEnemiesHeroIds = GetLaneEnemies(userStats.Position, userStats.IsRadiant, generalInfoMatchModel);

            var matchModel = new MatchModel()
            {
                DotaId = dotaId,
                MatchId = longMatchId,
                WinratesAnalysis = pickAdvice,
                ItemsAnalysis = itemsAdvice,
                LaningAnalysis = laningAdvice,
                Laning = laningMatchModel,
                AvgHeroStats = _mapper.Map<Models.Match.AvgHeroStats>(avgHeroStats),
                GeneralInfo = generalInfoMatchModel,
                UserStats = _mapper.Map<Models.Match.UserStats>(userStats),
                Picks = _mapper.Map<Picks>(picks)
            };

            await _matchRepository.CreateMatch(_mapper.Map<MatchEntity>(matchModel));

            return matchModel;
        }

        private static List<int> GetLaneAllies(string playerPosition, bool isRadiant, GeneralInfo generalInfo)
        {
            var laneAllies = new List<int>();

            var alliedPositions = new List<string>();

            switch (playerPosition)
            {
                case "POSITION_1":
                    alliedPositions.Add("POSITION_5");
                    break;
                case "POSITION_2":
                    break;
                case "POSITION_3":
                    alliedPositions.Add("POSITION_4");
                    break;
                case "POSITION_4":
                    alliedPositions.Add("POSITION_3");
                    break;
                case "POSITION_5":
                    alliedPositions.Add("POSITION_1");
                    break;
                default:
                    return laneAllies;
            }

            foreach (var player in generalInfo.Players)
            {
                if (player.IsRadiant == isRadiant && alliedPositions.Contains(player.Position))
                {
                    laneAllies.Add(player.HeroId);
                }
            }

            return laneAllies;
        }

        private static List<int> GetLaneEnemies(string playerPosition, bool isRadiant, GeneralInfo generalInfo)
        {
            var laneEnemies = new List<int>();
            var enemyPositions = new List<string>();

            switch (playerPosition)
            {
                case "POSITION_1":
                    enemyPositions.Add("POSITION_3");
                    enemyPositions.Add("POSITION_4");
                    break;
                case "POSITION_2":
                    enemyPositions.Add("POSITION_2");
                    break;
                case "POSITION_3":
                    enemyPositions.Add("POSITION_1");
                    enemyPositions.Add("POSITION_5");
                    break;
                case "POSITION_4":
                    enemyPositions.Add("POSITION_1");
                    enemyPositions.Add("POSITION_5");
                    break;
                case "POSITION_5":
                    enemyPositions.Add("POSITION_3");
                    enemyPositions.Add("POSITION_4");
                    break;
                default:
                    return laneEnemies;
            }

            foreach (var player in generalInfo.Players)
            {
                if (player.IsRadiant != isRadiant && enemyPositions.Contains(player.Position))
                {
                    laneEnemies.Add(player.HeroId);
                }
            }

            return laneEnemies;
        }

        private static (string rank, string rankBracket) GetRank(int matchRank)
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

        private static (List<int> alliedHeroIds, List<int> enemyHeroIds) GetEnemiesAndAllies(MatchInfo matchInfo, int userHeroId)
        {
            var isUserRadiant = matchInfo.Players.Where(p => p.HeroId == userHeroId).Single().IsRadiant;

            var alliedHeroIds = matchInfo.Players.Where(p => p.IsRadiant == isUserRadiant && p.HeroId != userHeroId).Select(p => p.HeroId).ToList()
                ?? throw new ArgumentNullException("alliedHeroIds is null");
            var enemyHeroIds = matchInfo.Players.Where(p => p.IsRadiant != isUserRadiant).Select(p => p.HeroId).ToList()
                ?? throw new ArgumentNullException("enemyHeroIds is null");

            return (alliedHeroIds, enemyHeroIds);
        }
    }
}
