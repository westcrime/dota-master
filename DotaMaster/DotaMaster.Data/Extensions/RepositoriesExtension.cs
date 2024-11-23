﻿using DotaMaster.Data.MappingProfiles;
using DotaMaster.Data.Repositories;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.Extensions
{
    public static class RepositoriesExtension
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            // Adding database context in container
            //services.AddScoped<MongoDbContext>();

            // Adding repositories in container
            services.AddScoped<ProfileRepository>();

            // Adding mapping profile
            services.AddAutoMapper(typeof(DataMappingProfile));

            return services;
        }
    }
}