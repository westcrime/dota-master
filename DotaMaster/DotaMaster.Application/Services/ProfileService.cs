using AutoMapper;
using DotaMaster.Application.Models.Profile;
using DotaMaster.Data.Repositories;

namespace DotaMaster.Application.Services
{
    public class ProfileService(ProfileRepository profileRepository, IMapper mapper)
    {
        private readonly ProfileRepository _profileRepository = profileRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<SteamProfileModel> GetProfile(string steamId)
        {
            var profile = await _profileRepository.GetSteamUserProfileAsync(steamId);
            return _mapper.Map<SteamProfileModel>(profile);
        }

        public async Task<BasicInfoModel> GetBasicInfo(string steamId)
        {
            var basicInfo = await _profileRepository.GetBasicInfoAsync(steamId);
            return _mapper.Map<BasicInfoModel>(basicInfo);
        }

        public async Task<RecordsModel> GetRecords(string steamId)
        {
            var records = await _profileRepository.GetRecordsAsync(steamId);
            return _mapper.Map<RecordsModel>(records);
        }

        public async Task<IEnumerable<HeroStatModel>> GetHeroStats(string steamId)
        {
            var heroStats = await _profileRepository.GetRecentHeroesStatsAsync(steamId);
            return _mapper.Map<IEnumerable<HeroStatModel>>(heroStats);
        }

        public async Task<IEnumerable<MatchBasicInfoModel>> GetRecentMatches(string steamId, int limit, int offset, int? heroId)
        {
            var matchesInfo = await _profileRepository.GetMatchesInfoAsync(steamId, heroId, limit, offset);
            return _mapper.Map<IEnumerable<MatchBasicInfoModel>>(matchesInfo);
        }
    }
}
