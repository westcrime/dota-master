using DotaMaster.Application.MappingProfiles;
using DotaMaster.Application.Services;
using Microsoft.Extensions.DependencyInjection;

namespace DotaMaster.Application.DI
{
    public static class ApplicationDI
    {
        public static IServiceCollection AddApplicationDI(this IServiceCollection services)
        {
            services.AddScoped<ProfileService>();
            services.AddScoped<MatchService>();
            services.AddScoped<HeroService>();
            services.AddScoped<ItemService>();
            services.AddAutoMapper(typeof(ApplicationMappingProfile));

            return services;
        }
    }
}
