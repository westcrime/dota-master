using DotaMaster.Application.Models;
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
            CreateMap<Laning, LaningAnalyzeModel>();
            CreateMap<MatchInfo, MatchInfoModel>();
            CreateMap<PlayerPerfomance, PlayerPerfomanceModel>();
            CreateMap<HeroWrInfo, HeroWrInfoModel>();
            CreateMap<PickAnalyze, PickAnalyzeModel>();

            CreateMap<HeroPlayerPerfomance, HeroPlayerPerfomanceModel>();
            CreateMap<AvgHeroPerfomance, AvgHeroPerfomanceModel>();
            CreateMap<AvgHeroStats, GeneralHeroPerfomanceModel>();

            // Hero mapping
            CreateMap<Hero, HeroModel>();

            // Item mapping
            CreateMap<Item, ItemModel>();
        }
    }
}
