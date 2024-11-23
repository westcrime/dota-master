﻿using DotaMaster.Application.MappingProfiles;
using DotaMaster.Application.Services;
using DotaMaster.Data.Extensions;
using DotaMaster.Data.MappingProfiles;
using DotaMaster.Data.Repositories;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Application.Extensions
{
    public static class ServicesExtension
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            // Adding database context in container
            //services.AddScoped<MongoDbContext>();

            // Adding repositories in container
            services.AddRepositories();

            services.AddScoped<ProfileService>();

            // Adding mapping profile
            services.AddAutoMapper(typeof(ApplicationMappingProfile));

            return services;
        }
    }
}
