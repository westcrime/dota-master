using AutoMapper;
using DotaMaster.Application.Models;
using DotaMaster.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<ProfileModel> Get(string steamId)
        {
            var profile = await _profileRepository.GetSteamUserProfileAsync(steamId);
            return _mapper.Map<ProfileModel>(profile);
        }
    }
}
