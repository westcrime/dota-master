using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;

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
    }

}
