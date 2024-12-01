using AutoMapper;
using DotaMaster.API.DTOs;
using DotaMaster.Application.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DotaMaster.API.Controllers
{
    [ApiController]
    [Route("match")]
    public class MatchContoller : ControllerBase
    {
        private readonly MatchService _matchService;
        private readonly ILogger<MatchContoller> _logger;
        private readonly IMapper _mapper;

        public MatchContoller(MatchService matchService, ILogger<MatchContoller> logger, IMapper mapper)
        {
            _mapper = mapper;
            _matchService = matchService;
            _logger = logger;
        }

        [HttpGet("laning-analyze")]
        public async Task<IActionResult> GetLaningAnalyze([FromQuery] string matchId)
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

            var laningAnalyze = _mapper.Map<LaningAnalyzeDto>(await _matchService.GetLaningAnalyze(steamId, matchId));
            return Ok(laningAnalyze);
        }

        [HttpGet("pick-analyze")]
        public async Task<IActionResult> GetPickAnalyze([FromQuery] string matchId)
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

            var pickAnalyze = _mapper.Map<PickAnalyzeDto>(await _matchService.GetPickAnalyze(steamId, matchId));
            return Ok(pickAnalyze);
        }

        [HttpGet]
        public async Task<IActionResult> GetMatchInfo([FromQuery] string matchId)
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

            var matchInfo = _mapper.Map<MatchInfoDto>(await _matchService.GetMatchInfo(long.Parse(matchId)));
            return Ok(matchInfo);
        }
    }
}
