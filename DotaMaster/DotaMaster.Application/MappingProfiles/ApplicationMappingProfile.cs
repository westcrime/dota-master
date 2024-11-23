using DotaMaster.Application.Models;
using DotaMaster.Data.Entities;
using DotaMaster.Data.ResponseModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Application.MappingProfiles
{
    public class ApplicationMappingProfile : AutoMapper.Profile
    {
        public ApplicationMappingProfile()
        {
            // Profile mapping
            CreateMap<Data.Entities.Profile, ProfileModel>();
            CreateMap<Data.Entities.BasicInfo, BasicInfoModel>();
        }
    }
}
