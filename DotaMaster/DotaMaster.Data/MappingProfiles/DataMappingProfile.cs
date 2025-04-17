using AutoMapper;
using DotaMaster.Data.Entities.Match;
using DotaMaster.Data.ResponseModels.Match;

namespace DotaMaster.Data.MappingProfiles
{
    public class DataMappingProfile : Profile
    {
        public DataMappingProfile()
        {
            CreateMap<ResponseModels.Match.MatchInfoResponse.Player, DotaMaster.Data.Entities.Match.PlayerPerfomance>();
            CreateMap<MatchInfoResponse, MatchInfo>();
            CreateMap<UserStatsResponse, UserStats>();
            CreateMap<AvgHeroStatsResponse, AvgHeroStats>();
        }
    }
}
