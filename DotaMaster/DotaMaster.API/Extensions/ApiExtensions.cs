using DotaMaster.API.Infrastructure;
using DotaMaster.API.MappingProfiles;
using DotaMaster.Application.MappingProfiles;
using DotaMaster.Application.Services;
using DotaMaster.Data.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Application.Extensions
{
    public static class ApiExtension
    {
        public static IServiceCollection AddExtensions(this IServiceCollection services)
        {
            services.AddServices();

            // Adding mapping profile
            services.AddAutoMapper(typeof(ApiMappingProfile));

            // Adding problem details
            services.AddProblemDetails();

            // Global exception handler
            services.AddExceptionHandler<GlobalExceptionHandler>();

            return services;
        }
    }
}
