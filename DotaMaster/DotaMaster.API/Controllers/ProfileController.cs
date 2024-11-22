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
        public async Task<IActionResult> Get()
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

            var profile = await _profileService.Get(steamId);
            var profileDto = _mapper.Map<ProfileDto>(profile);
            return Ok(profileDto);
        }

    }
}
