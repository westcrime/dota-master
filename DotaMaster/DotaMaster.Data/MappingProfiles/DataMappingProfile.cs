using AutoMapper;
using DotaMaster.Data.Entities.Match;
using DotaMaster.Data.ResponseModels.Match;
using DotaMaster.Data.ResponseModels.MatchResponses;

namespace DotaMaster.Data.MappingProfiles
{
    public class DataMappingProfile : Profile
    {
        public DataMappingProfile()
        {
            CreateMap<MatchInfoResponse, MatchInfo>();
            CreateMap<UserStatsResponse, UserStats>();
            CreateMap<AvgHeroStatsResponse, AvgHeroStats>();

            CreateMap<HeroStatsModel, AvgHeroPerfomance>();
            CreateMap<PlayerPerfomancePlayerModel, Entities.HeroPlayerPerfomance>();

        }
    }
}
