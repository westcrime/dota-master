using DotaMaster.Application.Models;

namespace DotaMaster.API.DTOs
{
    public record PickAnalyzeDto(double HeroWinrate,
         List<HeroWrInfoDto> HeroWrWithAlliedHeroes,
         List<HeroWrInfoDto> HeroWrWithEnemyHeroes,
         string? PickAdvice
         );
}
