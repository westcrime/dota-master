using DotaMaster.API.DTOs;
using DotaMaster.Application.Models;
using DotaMaster.Data.Entities;

namespace DotaMaster.API.MappingProfiles
{
    public class ApiMappingProfile : AutoMapper.Profile
    {
        public ApiMappingProfile()
        {
            // Profile mapping
            CreateMap<ProfileModel, ProfileDto>();

            CreateMap<BasicInfoModel, BasicInfoDto>();

            CreateMap<RecordsModel, RecordsDto>();

            CreateMap<HeroStatModel, HeroStatDto>();

            CreateMap<MatchBasicInfoModel, MatchBasicInfoDto>();

            // Match mapping
            CreateMap<LaningAnalyzeModel, LaningAnalyzeDto>();
            CreateMap<MatchInfoModel, MatchInfoDto>();
            CreateMap<PlayerPerfomanceModel, PlayerPerfomanceDto>();
            CreateMap<HeroWrInfoModel, HeroWrInfoDto>();
            CreateMap<PickAnalyzeModel, PickAnalyzeDto>();

            CreateMap<HeroPlayerPerfomanceModel, HeroPlayerPerfomanceDto>();
            CreateMap<AvgHeroPerfomanceModel, AvgHeroPerfomanceDto>();
            CreateMap<GeneralHeroPerfomanceModel, GeneralHeroPerfomanceDto>();

            // Hero mapping
            CreateMap<HeroModel, HeroDto>();
        }
    }
}
