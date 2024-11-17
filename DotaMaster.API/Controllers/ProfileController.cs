using DotaMaster.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace DotaMaster.API.Controllers
{
    public class ProfileController: ControllerBase
    {
        private readonly SteamService _steamService;

        public ProfileController(SteamService steamService)
        {
            _steamService = steamService;
        }

        [Authorize]
        [HttpGet("{steamId}")]
        public async Task<IActionResult> GetProfile(string steamId)
        {
            var apiKey = "72A7BAC536C148D250CB7B70F6D07B79"; // Или из конфигурации
            var profile = await _steamService.GetSteamProfileAsync(steamId, apiKey);
            return Ok(profile);
        }
    }
}
