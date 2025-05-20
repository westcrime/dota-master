using DotaMaster.Application.Models;
using DotaMaster.Application.Models.Match;
using DotaMaster.Application.Models.Profile;
using DotaMaster.Data.Entities;
using DotaMaster.Data.Entities.Match;
using DotaMaster.Data.Entities.Profile;

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
            CreateMap<Data.Entities.Match.PlayerPerfomance, Models.Match.PlayerStats>();
            CreateMap<Data.Entities.Match.ItemPurchase, Models.Match.ItemPurchase>();
            CreateMap<DotaMaster.Data.Entities.Match.HeroWrInfo, Models.Match.HeroWr>();
            CreateMap<Models.Match.GeneralInfo, DotaMaster.Data.Entities.Match.GeneralInfoEntity>().ReverseMap();
            CreateMap<Models.Match.PlayerStats, DotaMaster.Data.Entities.Match.PlayerStatsEntity>().ReverseMap();
            CreateMap<Models.Match.UserStats, DotaMaster.Data.Entities.Match.UserStatsEntity>().ReverseMap();
            CreateMap<Models.Match.AvgHeroStats, DotaMaster.Data.Entities.Match.AvgHeroStatsEntity>().ReverseMap();
            CreateMap<Models.Match.Laning, DotaMaster.Data.Entities.Match.LaningEntity>().ReverseMap();
            CreateMap<Models.Match.Picks, DotaMaster.Data.Entities.Match.PicksEntity>().ReverseMap();
            CreateMap<Models.Match.ItemPurchase, DotaMaster.Data.Entities.Match.ItemPurchaseEntity>().ReverseMap();
            CreateMap<Models.Match.HeroWr, DotaMaster.Data.Entities.Match.HeroWrEntity>().ReverseMap();

            // Hero mapping
            CreateMap<Data.Entities.Hero, HeroModel>();

            // Item mapping
            CreateMap<Item, ItemModel>();
            CreateMap<Data.Entities.Attribute, Models.Attribute>();
        }
    }
}
