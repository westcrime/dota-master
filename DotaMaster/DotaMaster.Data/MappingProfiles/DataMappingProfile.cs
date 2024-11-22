using AutoMapper;
using DotaMaster.Data.ResponseModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.MappingProfiles
{
    public class DataMappingProfile : Profile
    {
        public DataMappingProfile()
        {
            // Profile mapping
            CreateMap<Player, Entities.Profile>();
        }
    }
}
