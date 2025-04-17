using Microsoft.AspNetCore.Authentication.Cookies;

namespace DotaMaster.API.DI
{
    public static class AuthDI
    {
        public static IServiceCollection AddAuthDI(this IServiceCollection services)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = "Steam";
            })
            .AddCookie()
            .AddSteam(options =>
            {
                options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            });

            return services;
        }
    }
}
