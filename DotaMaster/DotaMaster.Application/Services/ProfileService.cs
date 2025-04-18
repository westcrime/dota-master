﻿using AutoMapper;
using DotaMaster.Application.Models.Profile;
using DotaMaster.Data.Repositories;

namespace DotaMaster.Application.Services
{
    public class ProfileService
    {
        private readonly ProfileRepository _profileRepository;
        private readonly IMapper _mapper;

        public ProfileService(ProfileRepository profileRepository, IMapper mapper) 
        {
            _profileRepository = profileRepository;
            _mapper = mapper;
        }

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

        public async Task<IEnumerable<MatchBasicInfoModel>> GetRecentMatches(string steamId, int limit = 15, int offset = 0)
        {
            var matchesInfo = await _profileRepository.GetMatchesInfoAsync(steamId, limit, offset);
            return _mapper.Map<IEnumerable<MatchBasicInfoModel>>(matchesInfo);
        }
    }
}
