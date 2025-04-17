using DotaMaster.API.Infrastructure;
using DotaMaster.API.MappingProfiles;

namespace DotaMaster.API.DI
{
    public static class ApiDI
    {
        public static IServiceCollection AddApiDI(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(ApiMappingProfile));
            services.AddProblemDetails();
            services.AddExceptionHandler<GlobalExceptionHandler>();

            return services;
        }
    }
}
