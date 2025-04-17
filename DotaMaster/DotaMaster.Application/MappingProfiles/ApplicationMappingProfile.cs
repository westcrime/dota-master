using DotaMaster.Application.Models;
using DotaMaster.Application.Models.Match;
using DotaMaster.Application.Models.Profile;
using DotaMaster.Data.Entities;
using DotaMaster.Data.Entities.Match;
using DotaMaster.Data.Entities.Profile;
using DotaMaster.Data.ResponseModels.MatchResponses;

namespace DotaMaster.Application.MappingProfiles
{
    public class ApplicationMappingProfile : AutoMapper.Profile
    {
        public ApplicationMappingProfile()
        {
            // Profile mapping
            CreateMap<SteamProfile, SteamProfileModel>();
            CreateMap<BasicInfo, BasicInfoModel>();
            CreateMap<Records, RecordsModel>();
            CreateMap<HeroStat, HeroStatModel> ();
            CreateMap<MatchBasicInfo, MatchBasicInfoModel>();

            // Match mapping
            CreateMap<MatchEntity, MatchModel>();
            CreateMap<MatchModel, MatchEntity>();
            CreateMap<Data.Entities.Match.AvgHeroStats, Models.Match.AvgHeroStats>();
            CreateMap<Data.Entities.Match.MatchInfo, Models.Match.GeneralInfo>();
            CreateMap<Data.Entities.Match.UserStats, Models.Match.UserStats>();
            CreateMap<Data.Entities.Match.Laning, Models.Match.Laning>();
            CreateMap<Data.Entities.Match.PickInfo, Models.Match.Picks>();

            // Hero mapping
            CreateMap<Data.Entities.Hero, HeroModel>();

            // Item mapping
            CreateMap<Item, ItemModel>();
        }
    }
}
