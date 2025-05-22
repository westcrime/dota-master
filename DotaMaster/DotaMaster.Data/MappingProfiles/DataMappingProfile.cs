using AutoMapper;
using DotaMaster.Data.Entities;
using DotaMaster.Data.Entities.Match;
using DotaMaster.Data.ResponseModels.Hero;
using DotaMaster.Data.ResponseModels.Match;

namespace DotaMaster.Data.MappingProfiles
{
    public class DataMappingProfile : Profile
    {
        public DataMappingProfile()
        {
            CreateMap<MatchInfoResponse.Player, PlayerPerfomance>();
            CreateMap<MatchInfoResponse, MatchInfo>();
            CreateMap<UserStatsResponse, UserStats>();
            CreateMap<AvgHeroStatsResponse, AvgHeroStats>();
            CreateMap<HeroResponse, Hero>();
            CreateMap<HeroOpendotaResponse, Hero>();
            CreateMap<ResponseModels.Items.Attribute, Entities.Attribute>();
        }
    }
}
