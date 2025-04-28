using DotaMaster.API.Infrastructure;

namespace DotaMaster.API.DI
{
    public static class ApiDI
    {
        public static IServiceCollection AddApiDI(this IServiceCollection services)
        {
            services.AddProblemDetails();
            services.AddExceptionHandler<GlobalExceptionHandler>();

            return services;
        }
    }
}
