using DotaMaster.Data.Contexts;
using DotaMaster.Data.MappingProfiles;
using DotaMaster.Data.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

namespace DotaMaster.Data.DI
{
    public static class DataDI
    {
        public static IServiceCollection AddDataDI(this IServiceCollection services, IConfiguration configuration)
        {   
            var mongoConnectionString = configuration["MongoDB:ConnectionString"]
                ?? throw new ArgumentNullException("Mongo DB connection string is null.");
            var mongoClient = new MongoClient(mongoConnectionString);
            services.AddSingleton<IMongoClient>(mongoClient);
            services.AddSingleton<MatchDbContext>();
            services.AddScoped<ProfileRepository>();
            services.AddScoped<MatchRepository>();
            services.AddScoped<HeroRepository>();
            services.AddScoped<ItemRepository>();
            services.AddScoped<AiRepository>();
            services.AddAutoMapper(typeof(DataMappingProfile));

            return services;
        }
    }
}
