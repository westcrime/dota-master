using DotaMaster.API.DTOs;
using DotaMaster.Application.Models;
using DotaMaster.Application.Models.Profile;
using DotaMaster.Data.Entities;

namespace DotaMaster.API.MappingProfiles
{
    public class ApiMappingProfile : AutoMapper.Profile
    {
        public ApiMappingProfile()
        {
            // Profile mapping
            CreateMap<SteamProfileModel, ProfileDto>();

            CreateMap<BasicInfoModel, BasicInfoDto>();

            CreateMap<RecordsModel, RecordsDto>();

            CreateMap<HeroStatModel, HeroStatDto>();

            CreateMap<MatchBasicInfoModel, MatchBasicInfoDto>();

            // Hero mapping
            CreateMap<HeroModel, HeroDto>();

            // Item mapping
            CreateMap<ItemModel, ItemDto>();
        }
    }
}
