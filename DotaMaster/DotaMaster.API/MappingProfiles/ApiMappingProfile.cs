using DotaMaster.API.DTOs;
using DotaMaster.Application.Models;

namespace DotaMaster.API.MappingProfiles
{
    public class ApiMappingProfile : AutoMapper.Profile
    {
        public ApiMappingProfile()
        {
            // Profile mapping
            CreateMap<ProfileModel, ProfileDto>();

            CreateMap<BasicInfoModel, BasicInfoDto>();
        }
    }
}
