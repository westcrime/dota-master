using DotaMaster.API.MappingProfiles;
using DotaMaster.Application.Extensions;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace DotaMaster.API.Extensions
{
    public static class AuthExtensions
    {
        public static IServiceCollection AddAuthExtensions(this IServiceCollection services)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = "Steam";
            })
            .AddCookie() // Добавляем Cookie аутентификацию
            .AddSteam(options =>
            {
                options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            });

            return services;
        }
    }
}
