using AutoMapper;
using DotaMaster.Data.ResponseModels.HeroResponses;
using DotaMaster.Data.ResponseModels.MatchResponses;
using DotaMaster.Data.ResponseModels.ProfileResponses;
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
            CreateMap<ResponseModels.ProfileResponses.Player, Entities.Profile>();

            // Hero mapping
            CreateMap<HeroResponse, Entities.Hero>();

            // Match mapping 
            CreateMap<GeneralMatchInfoResponse.MatchInfo, Entities.MatchInfo>();
            CreateMap<GeneralMatchInfoResponse.Player, Entities.PlayerPerfomance>();
        }
    }
}
