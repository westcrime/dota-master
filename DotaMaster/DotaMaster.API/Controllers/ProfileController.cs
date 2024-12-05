using AutoMapper;
using DotaMaster.API.DTOs;
using DotaMaster.Application.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DotaMaster.API.Controllers
{
    [ApiController]
    [Route("profile")]
    public class ProfileController : ControllerBase
    {
        private readonly ProfileService _profileService;
        private readonly ILogger<ProfileController> _logger;
        private readonly IMapper _mapper;

        public ProfileController(ProfileService profileService, ILogger<ProfileController> logger, IMapper mapper)
        {
            _mapper = mapper;
            _profileService = profileService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfile()
        {
            if (User.Identity == null || !User.Identity.IsAuthenticated)
            {
                return Unauthorized(new { Message = "User is not authenticated" });
            }

            // Получение Steam ID из утверждений
            var steamId = User.FindFirstValue(ClaimTypes.NameIdentifier).Split('/').Last();
            if (string.IsNullOrEmpty(steamId))
            {
                return BadRequest(new { Message = "Steam ID not found in claims" });
            }

            var profile = await _profileService.GetProfile(steamId);
            var profileDto = _mapper.Map<ProfileDto>(profile);
            return Ok(profileDto);
        }

        [HttpGet("basic-info")]
        public async Task<IActionResult> GetBasicInfo()
        {
            if (User.Identity == null || !User.Identity.IsAuthenticated)
            {
                return Unauthorized(new { Message = "User is not authenticated" });
            }

            // Получение Steam ID из утверждений
            var steamId = User.FindFirstValue(ClaimTypes.NameIdentifier).Split('/').Last();
            if (string.IsNullOrEmpty(steamId))
            {
                return BadRequest(new { Message = "Steam ID not found in claims" });
            }

            var basicInfoModel = await _profileService.GetBasicInfo(steamId);
            var basicInfoDto = _mapper.Map<BasicInfoDto>(basicInfoModel);
            return Ok(basicInfoDto);
        }

        [HttpGet("records")]
        public async Task<IActionResult> GetRecords()
        {
            if (User.Identity == null || !User.Identity.IsAuthenticated)
            {
                return Unauthorized(new { Message = "User is not authenticated" });
            }

            // Получение Steam ID из утверждений
            var steamId = User.FindFirstValue(ClaimTypes.NameIdentifier).Split('/').Last();
            if (string.IsNullOrEmpty(steamId))
            {
                return BadRequest(new { Message = "Steam ID not found in claims" });
            }

            var recordsModel = await _profileService.GetRecords(steamId);
            var recordsDto = _mapper.Map<RecordsDto>(recordsModel);
            return Ok(recordsDto);
        }

        [HttpGet("recent-hero-stats")]
        public async Task<IActionResult> GetRecentHeroStats()
        {
            if (User.Identity == null || !User.Identity.IsAuthenticated)
            {
                return Unauthorized(new { Message = "User is not authenticated" });
            }

            // Получение Steam ID из утверждений
            var steamId = User.FindFirstValue(ClaimTypes.NameIdentifier).Split('/').Last();
            if (string.IsNullOrEmpty(steamId))
            {
                return BadRequest(new { Message = "Steam ID not found in claims" });
            }

            var heroStatModels = await _profileService.GetHeroStats(steamId);
            var heroStatDtos = _mapper.Map<IEnumerable<HeroStatDto>>(heroStatModels);
            return Ok(heroStatDtos);
        }

        [HttpGet("matches-basic-info")]
        public async Task<IActionResult> GetMatchesBasicInfo()
        {
            if (User.Identity == null || !User.Identity.IsAuthenticated)
            {
                return Unauthorized(new { Message = "User is not authenticated" });
            }

            // Получение Steam ID из утверждений
            var steamId = User.FindFirstValue(ClaimTypes.NameIdentifier).Split('/').Last();
            if (string.IsNullOrEmpty(steamId))
            {
                return BadRequest(new { Message = "Steam ID not found in claims" });
            }

            var matchModels = await _profileService.GetBasicMatchesInfo(steamId);
            var matchDtos = _mapper.Map<IEnumerable<MatchBasicInfoDto>>(matchModels);
            return Ok(matchDtos);
        }
    }
}
