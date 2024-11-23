using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DotaMaster.API.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        [HttpGet("login")]
        public IActionResult Login()
        {
            // Редирект на Steam для авторизации
            return Challenge(new AuthenticationProperties { RedirectUri = "/" }, "Steam");
        }

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            // Удаление куков аутентификации
            return SignOut(new AuthenticationProperties { RedirectUri = "/" }, CookieAuthenticationDefaults.AuthenticationScheme);
        }

        [HttpGet("current-user")]
        public IActionResult GetCurrentUser()
        {
            if (User.Identity == null || !User.Identity.IsAuthenticated)
                return Unauthorized(new { Message = "User is not authenticated" });

            // Получение Steam ID из утверждений
            var steamId = User.FindFirstValue(ClaimTypes.NameIdentifier).Split('/').Last();

            return Ok(new
            {
                SteamId = steamId
            });
        }
    }
}
