using DotaMaster.Application.Models;
using DotaMaster.Data.Entities;
using DotaMaster.Data.Entities.Profile;
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
            CreateMap<SteamProfile, ProfileModel>();
            CreateMap<BasicInfo, BasicInfoModel>();
            CreateMap<Data.Entities.Records, RecordsModel>();
            CreateMap<HeroStat, HeroStatModel> ();
            CreateMap<MatchBasicInfo, MatchBasicInfoModel>();

            // Match mapping
            CreateMap<LaningAnalyze, LaningAnalyzeModel>();
            CreateMap<MatchInfo, MatchInfoModel>();
            CreateMap<PlayerPerfomance, PlayerPerfomanceModel>();
            CreateMap<HeroWrInfo, HeroWrInfoModel>();
            CreateMap<PickAnalyze, PickAnalyzeModel>();

            CreateMap<HeroPlayerPerfomance, HeroPlayerPerfomanceModel>();
            CreateMap<AvgHeroPerfomance, AvgHeroPerfomanceModel>();
            CreateMap<GeneralHeroPerfomance, GeneralHeroPerfomanceModel>();

            // Hero mapping
            CreateMap<Hero, HeroModel>();

            // Item mapping
            CreateMap<Item, ItemModel>();
        }
    }
}
