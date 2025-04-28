using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

namespace DotaMaster.API.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController(ILogger<HeroesController> logger) : ControllerBase
    {
        private readonly ILogger<HeroesController> _logger = logger;

        [HttpGet("login")]
        public IActionResult Login()
        {
            _logger.LogInformation("Login requested");
            return Challenge(new AuthenticationProperties { RedirectUri = "http://localhost:3000/profile" }, "Steam");
        }

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            _logger.LogInformation("Logout requested");
            return SignOut(new AuthenticationProperties { RedirectUri = "http://localhost:3000/welcome" }, CookieAuthenticationDefaults.AuthenticationScheme);
        }

        [HttpGet("current-user")]
        public IActionResult GetCurrentUser()
        {
            _logger.LogInformation("Current user requested");
            if (User.Identity == null || !User.Identity.IsAuthenticated)
                return Unauthorized(new { Message = "User is not authenticated" });

            var steamId = User.FindFirstValue(ClaimTypes.NameIdentifier)?.Split('/').Last();

            return Ok(new
            {
                SteamId = steamId
            });
        }
    }
}
