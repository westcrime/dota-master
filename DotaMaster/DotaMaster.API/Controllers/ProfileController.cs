using System.Security.Claims;
using DotaMaster.Application.Models.Profile;
using DotaMaster.Application.Services;
using DotaMaster.Domain.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DotaMaster.API.Controllers
{
    [ApiController]
    [Route("profile")]
    public class ProfileController(ProfileService profileService, ILogger<ProfileController> logger) : ControllerBase
    {
        private readonly ProfileService _profileService = profileService;
        private readonly ILogger<ProfileController> _logger = logger;

        [Authorize]
        [HttpGet]
        public async Task<SteamProfileModel> GetProfile()
        {
            _logger.LogInformation("Steam profile requested");
            string steamId = CheckAuthorization();
            return await _profileService.GetProfile(steamId);
        }

        private string CheckAuthorization()
        {
            var steamId = User.FindFirstValue(ClaimTypes.NameIdentifier).Split('/').Last();
            if (string.IsNullOrEmpty(steamId))
            {
                throw new BadRequestException("Steam ID not found in claims");
            }

            return steamId;
        }

        [Authorize]
        [HttpGet("basic-info")]
        public async Task<BasicInfoModel> GetBasicInfo()
        {
            _logger.LogInformation("Basic Profile Info requested");
            string steamId = CheckAuthorization();
            return await _profileService.GetBasicInfo(steamId);
        }

        [Authorize]
        [HttpGet("records")]
        public async Task<RecordsModel> GetRecords()
        {
            _logger.LogInformation("Records requested");
            string steamId = CheckAuthorization();
            return await _profileService.GetRecords(steamId);
        }

        [Authorize]
        [HttpGet("recent-hero-stats")]
        public async Task<IEnumerable<HeroStatModel>> GetRecentHeroStats()
        {
            _logger.LogInformation("Recent hero stats requested");
            string steamId = CheckAuthorization();
            return await _profileService.GetHeroStats(steamId);
        }

        [Authorize]
        [HttpGet("matches")]
        public async Task<IEnumerable<MatchBasicInfoModel>> GetMatches(int? heroId, int limit = 15, int offset = 0)
        {
            _logger.LogInformation("Matches List requested");
            string steamId = CheckAuthorization();
            return await _profileService.GetRecentMatches(steamId, limit, offset, heroId);
        }
    }
}
