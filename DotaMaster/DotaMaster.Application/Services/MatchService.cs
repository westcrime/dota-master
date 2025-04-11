using System.Text;
using AutoMapper;
using DotaMaster.Application.Models;
using DotaMaster.Application.Models.Match;
using DotaMaster.Data.Repositories;

namespace DotaMaster.Application.Services
{
    public class MatchService(MatchRepository matchRepository, IMapper mapper)
    {
        private readonly MatchRepository _matchRepository = matchRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<MatchModel> Get(string steamId, string matchId)
        {
            var longMatchId = long.Parse(matchId);
            var generalInfo = await _matchRepository.GetMatchInfo(longMatchId);
            var rank = GetRank(generalInfo.Rank);
            var userStats = await _matchRepository.GetUserStats(steamId, longMatchId);
            var avgHeroStats = await _matchRepository.GetAvgHeroStats(
                generalInfo.DurationSeconds,
                userStats.HeroId, 
                rank,
                userStats.Position);
            var laning = await _matchRepository.GetLaningAsync(rank, userStats.HeroId, userStats.Position, longMatchId, steamId);

            var laningAnalyze = await _matchRepository.GetLaningAnalyzeAsync(longMatchId, steamId);
            var laningAnalyzeModel = _mapper.Map<LaningAnalyzeModel>(laningAnalyze);
            laningAnalyzeModel.CsAdvice = GenerateDetailedCsLaningAdvice(laningAnalyzeModel.Position, laningAnalyzeModel.LaningCs, laningAnalyzeModel.AvgLaningCs);
            laningAnalyzeModel.KdaAdvice = AnalyzeKdaForLaning((double)laningAnalyzeModel.LaningKills, (double)laningAnalyzeModel.LaningDeaths, laningAnalyzeModel.AvgLaningKills, laningAnalyzeModel.AvgLaningDeaths);
            laningAnalyzeModel.NetworthAdvice = AnalyzeNetworthForLaning(laningAnalyzeModel.LaningNetworth, laningAnalyzeModel.AvgLaningNetworth);
            return laningAnalyzeModel;
        }

        public async Task<LaningAnalyzeModel> GetLaningAnalyze(string steamId, string matchId)
        {
            var laningAnalyze = await _matchRepository.GetLaningAnalyzeAsync(long.Parse(matchId), steamId);
            var laningAnalyzeModel = _mapper.Map<LaningAnalyzeModel>(laningAnalyze);
            laningAnalyzeModel.CsAdvice = GenerateDetailedCsLaningAdvice(laningAnalyzeModel.Position, laningAnalyzeModel.LaningCs, laningAnalyzeModel.AvgLaningCs);
            laningAnalyzeModel.KdaAdvice = AnalyzeKdaForLaning((double)laningAnalyzeModel.LaningKills, (double)laningAnalyzeModel.LaningDeaths, laningAnalyzeModel.AvgLaningKills, laningAnalyzeModel.AvgLaningDeaths);
            laningAnalyzeModel.NetworthAdvice = AnalyzeNetworthForLaning(laningAnalyzeModel.LaningNetworth, laningAnalyzeModel.AvgLaningNetworth);
            return laningAnalyzeModel;
        }
        public async Task<PickAnalyzeModel> GetPickAnalyze(string steamId, string matchId)
        {
            var pickAnalyze = await _matchRepository.GetPickAnalyzeAsync(long.Parse(matchId), steamId);
            var pickAnalyzeModel =  _mapper.Map<PickAnalyzeModel>(pickAnalyze);
            pickAnalyzeModel.PickAdvice = GeneratePickAdvice(pickAnalyzeModel);
            return pickAnalyzeModel;
        }

        private static string GeneratePickAdvice(PickAnalyzeModel pickAnalyzeModel)
        {
            var heroWinrate = pickAnalyzeModel.HeroWinrate;
            var avgAllyWinrate = pickAnalyzeModel.HeroWrWithAlliedHeroes.Average(ally => ally.Winrate);
            var avgEnemyWinrate = pickAnalyzeModel.HeroWrWithEnemyHeroes.Average(enemy => enemy.Winrate);

            string heroAdvice = heroWinrate > 0.51
                ? $"Ваш герой имеет сильный общий винрейт ({heroWinrate:P}). Это хороший выбор для текущей игры."
                : heroWinrate < 0.49
                    ? $"Ваш герой имеет слабый общий винрейт ({heroWinrate:P}). Возможно, стоит подумать о другом герое в будущих играх."
                    : $"Ваш герой имеет средний винрейт ({heroWinrate:P}). В этом патче есть герои и получше.";

            string allyAdvice = avgAllyWinrate > 0.50
                ? $"С учетом ваших союзников, ваш герой имеет улучшенную вероятность победы ({avgAllyWinrate:P}). Хороший пик для союзных героев."
                : $"С учетом ваших союзников, ваш герой имеет пониженную вероятность победы ({avgAllyWinrate:P}). Стоит изучить получше мету этого патча или просить тиммейтов пикнуть более подходящих героев для вашего пресонажа.";

            string enemyAdvice = avgEnemyWinrate < 0.50
                ? $"Против врагов с текущими героями ({string.Join(", ", pickAnalyzeModel.HeroWrWithEnemyHeroes.Select(e => e.HeroId))}), ваш герой имеет низкий винрейт ({avgEnemyWinrate:P}). Попробуйте анализировать способности врагов" +
                $"и выбрать более подхоядящего."
                : $"Ваш герой имеет хорошую вероятность против врагов ({avgEnemyWinrate:P}). Так держать, с хорошим пиком играть в разы проще.";

            return $"{heroAdvice} {allyAdvice} {enemyAdvice}";
        }

        public string GenerateDetailedCsLaningAdvice(
            string position,
            int laningCs,
            double avgLaningCs)
        {
            string advice = position.ToLower() switch
            {
                "position_1" => AnalyzeLaningCsForCarry(laningCs, avgLaningCs),
                "position_2" => AnalyzeLaningCsForMid(laningCs, avgLaningCs),
                "position_3" => AnalyzeLaningCsForOfflane(laningCs, avgLaningCs),
                "position_4" or "position_5" => $"Как саппорт, количество добитых крипов ({laningCs}) не имеет критического значения." +
                $" Важно помогать команде: обеспечивать вижен, харасить врагов и сейвить союзников. Однако большая ценность саппорта дает очень большое преимущество в начале игры.",
                _ => $"Неизвестная позиция '{position}'. Проверьте данные и попробуйте снова.",
            };

            // Возвращение результата
            return advice;
        }

        private string AnalyzeLaningCsForCarry(double laningCs, double avgLaningCs)
        {
            double csRatio = laningCs / avgLaningCs; // Относительная разница
            if (csRatio > 1.4)
                return $"Ваш фарм значительно превышает средний уровень ({csRatio:F2}x от среднего). Отличная работа!";
            if (csRatio > 1.1)
                return $"Ваш фарм выше среднего ({csRatio:F2}x от среднего). Это хороший результат, но выжно выявить более эффективные пути фарма для максимально выгоды (используйте отводы).";
            if (csRatio < 0.7)
                return $"Ваш фарм значительно ниже среднего ({csRatio:F2}x от среднего). Постарайтесь лучше использовать моменты для добивания крипов и контролировать линию. Следите за картой на возможность выходов противника на вас.";
            return $"Ваш фарм немного ниже среднего ({csRatio:F2}x от среднего). Стоит потренироваться добиванию крипов и управлению линией.";
        }

        private string AnalyzeLaningCsForMid(double laningCs, double avgLaningCs)
        {
            double csRatio = laningCs / avgLaningCs; // Относительная разница
            if (csRatio > 1.5)
                return $"Ваш крипстат на центральной линии значительно превышает средний ({csRatio:F2}x от среднего). Отличная работа, но не забывайте помогать команде по возможности с таким хорошим стартом.";
            if (csRatio > 1.2)
                return $"Ваш крипстат на центральной линии выше среднего ({csRatio:F2}x от среднего). Хороший результат, поддерживайте темп.";
            if (csRatio < 0.6)
                return $"Ваш крипстат на центральной линии значительно ниже среднего ({csRatio:F2}x от среднего). Попробуйте использовать способности для более эффективного добивания крипов и не забывайте про блжние лесные кемпы.";
            return $"Ваш крипстат немного ниже среднего ({csRatio:F2}x от среднего). Сосредоточьтесь на управлении линией и лесных крипах.";
        }

        private string AnalyzeLaningCsForOfflane(double laningCs, double avgLaningCs)
        {
            double csRatio = laningCs / avgLaningCs; // Относительная разница
            if (csRatio > 1.3)
                return $"Вы значительно превзошли средний уровень фарма на сложной линии ({csRatio:F2}x от среднего). Используйте это преимущество, чтобы испортить жизнь вражескому керри.";
            if (csRatio > 1.0)
                return $"Ваш фарм на сложной линии соответствует или немного превышает средний уровень ({csRatio:F2}x от среднего). Хороший результат.";
            if (csRatio < 0.7)
                return $"Ваш фарм на сложной линии значительно ниже среднего ({csRatio:F2}x от среднего). Постарайтесь сосредоточиться на получении опыта и избегать ненужных рисков." +
                    $"Нарастите парктику на этом герое, чтобы чувствовать, когда вы не можете умереть";
            return $"Ваш фарм немного ниже среднего ({csRatio:F2}x от среднего). Постарайтесь лучше выбирать позиции для добивания крипов и следите за картой.";
        }

        public string AnalyzeKdaForLaning(double LaningKills, double LaningDeaths, double AvgLaningKills, double AvgLaningDeaths)
        {
            double kdaRatio = (LaningKills + 0.5 * LaningDeaths) / (LaningDeaths > 0 ? LaningDeaths : 1); // Basic KDA calculation
            double avgKdaRatio = (AvgLaningKills + 0.5 * AvgLaningDeaths) / (AvgLaningDeaths > 0 ? AvgLaningDeaths : 1); // Average KDA
            var KdaAdvice = "";
            if (kdaRatio > avgKdaRatio * 1.5)
            {
                KdaAdvice = $"Ваш KDA ({kdaRatio:F2}) значительно превышает средний уровень ({avgKdaRatio:F2}). Отличная игра! Продолжайте использовать свою агрессию, но не забывайте о безопасности.";
            }
            else if (kdaRatio > avgKdaRatio)
            {
                KdaAdvice = $"Ваш KDA ({kdaRatio:F2}) выше среднего ({avgKdaRatio:F2}). Хорошая игра, но попробуйте уменьшить количество смертей.";
            }
            else if (kdaRatio < avgKdaRatio * 0.7)
            {
                KdaAdvice = $"Ваш KDA ({kdaRatio:F2}) значительно ниже среднего ({avgKdaRatio:F2}). Возможно вам требуется больше игр на этом герое, чтобы правильно измерять ваши силы.Постарайтесь избегать излишней агрессии, чтобы не давать врагам легкие фраги. Играйте под своим виженом, либо стакнитесь с союзниками.";
            }
            else
            {
                KdaAdvice = $"Ваш KDA ({kdaRatio:F2}) немного ниже среднего ({avgKdaRatio:F2}). Постарайтесь уменьшить количество смертей и играть более осторожно. Используйте вижен и варды.";
            }

            return KdaAdvice;
        }

        public string AnalyzeNetworthForLaning(double LaningNetworth, double AvgLaningNetworth)
        {
            double networthDifference = LaningNetworth - AvgLaningNetworth;
            double networthRatio = LaningNetworth / AvgLaningNetworth;

            var NetworthAdvice = "";

            if (networthRatio > 1.3)
            {
                NetworthAdvice = $"Ваш нетворс ({LaningNetworth}) значительно превышает средний уровень ({AvgLaningNetworth}). Отличный фарм! Постарайтесь продолжать развивать свои преимущества, покупая ключевые предметы, чтобы доминировать в игре." +
                    $" Важно не умирать, ведь можно отдать много преимущества врагам для комбека. Докупите важные предметы, и с ними нарастайте преимущества.";
            }
            else if (networthRatio > 1.1)
            {
                NetworthAdvice = $"Ваш нетворс ({LaningNetworth}) выше среднего ({AvgLaningNetworth}). Хороший результат. Попробуйте продолжить стабильно фармить и обратите внимание на нужные предметы для своей роли.";
            }
            else if (networthRatio < 0.7)
            {
                NetworthAdvice = $"Ваш нетворс ({LaningNetworth}) значительно ниже среднего ({AvgLaningNetworth}). Нужно усилить свой фарм или избежать ненужных смертей, чтобы не отставать от противников." +
                    $"Следите за миникартой, чтобы понимать где враги и лайновые крипы.";
            }
            else
            {
                NetworthAdvice = $"Ваш нетворс ({LaningNetworth}) немного ниже среднего ({AvgLaningNetworth}). Попробуйте улучшить фарм на линии и сосредоточьтесь на эффективном получении золота. Последите за игроками на высоком рейтинге, чтобы выделить для себя" +
                    $"эффективные пути фарма. Следите за миникартой, чтобы понимать где враги и лайновые крипы.";
            }

            return NetworthAdvice;
        }

        public async Task<MatchInfoModel> GetMatchInfo(long matchId)
        {
            var matchInfoModel = await _matchRepository.GetMatchInfo(matchId);
            return _mapper.Map<MatchInfoModel>(matchInfoModel);
        }

        public async Task<GeneralHeroPerfomanceModel> GetGeneralPerfomance(long matchId, string steamId)
        {

            var perfomance = await _matchRepository.GetUserStats(steamId, matchId);
            var perfomanceModel = _mapper.Map<GeneralHeroPerfomanceModel>(perfomance);
            perfomanceModel.Advice = await GetGeneralPerfomanceAdvice(perfomanceModel);
            return perfomanceModel;
        }

        private async Task<string> GetGeneralPerfomanceAdvice(GeneralHeroPerfomanceModel perfomanceModel)
        {
            var player = perfomanceModel.PlayerPerfomance;
            var avg = perfomanceModel.AvgHeroPerfomance;

            var adviceBuilder = new StringBuilder();

            // Анализ фарма (Networth, GPM, CS)
            double networthDifference = player.Networth - avg.Networth;
            if (networthDifference > 1000)
                adviceBuilder.AppendLine("Ваш уровень фарма значительно выше среднего. Используйте это преимущество для активной игры и захвата инициативы.");
            else if (networthDifference < -1000)
                adviceBuilder.AppendLine("Ваш уровень фарма ниже среднего. Постарайтесь улучшить контроль карты и эффективность фарма.");

            // Анализ убийств и смертей (Kills, Deaths)
            if (player.Kills > avg.Kills * 1.5)
                adviceBuilder.AppendLine("Вы значительно превосходите средний показатель убийств. Продолжайте поддерживать агрессивный стиль игры, но не забывайте о безопасности.");
            if (player.Deaths > avg.Deaths * 1.5)
                adviceBuilder.AppendLine("У вас много смертей. Постарайтесь играть осторожнее и улучшить позиционирование в бою.");

            // Анализ поддержки (Assists)
            if (player.Assists > avg.Assists * 1.5)
                adviceBuilder.AppendLine("Ваши ассисты превосходят средние значения. Это говорит о хорошем участии в командных боях.");
            else if (player.Assists < avg.Assists * 0.7)
                adviceBuilder.AppendLine("Количество ассистов ниже среднего. Постарайтесь активнее участвовать в командных действиях.");

            // Анализ IMP (Impact Score)
            if (player.Imp > 20)
                adviceBuilder.AppendLine("Ваш показатель импакта высок. Вы эффективно вносите вклад в успех команды.");
            else if (player.Imp < 10)
                adviceBuilder.AppendLine("Ваш показатель импакта низок. Подумайте о более активной игре, чтобы повлиять на исход матча.");

            // Анализ урона и экономических факторов (HeroDamage, GoldFed, XpFed)
            if (avg.HeroDamage > 0 && player.Networth > avg.Networth * 1.2)
                adviceBuilder.AppendLine("Ваш уровень урона соответствует высокому показателю экономики. Старайтесь поддерживать давление на врага.");
            if (avg.GoldFed > 0 && avg.XpFed > 0 && player.Deaths > avg.Deaths * 1.5)
                adviceBuilder.AppendLine("Вы отдаёте врагам много золота и опыта. Постарайтесь уменьшить количество смертей.");

            // Завершающий вывод
            if (adviceBuilder.Length == 0)
                adviceBuilder.AppendLine("Ваши показатели соответствуют средним значениям. Продолжайте играть стабильно и поддерживать команду.");

            return adviceBuilder.ToString();
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
    }
}
