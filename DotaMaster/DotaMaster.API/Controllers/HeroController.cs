using AutoMapper;
using DotaMaster.API.DTOs;
using DotaMaster.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace DotaMaster.API.Controllers
{
    [ApiController]
    [Route("hero")]
    public class HeroController : ControllerBase
    {
        private readonly HeroService _heroService;
        private readonly ILogger<HeroController> _logger;
        private readonly IMapper _mapper;

        public HeroController(HeroService heroService, ILogger<HeroController> logger, IMapper mapper)
        {
            _heroService = heroService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("heroes-info")]
        public async Task<ActionResult> GetHeroesInfo()
        {
            var heroesModel = await _heroService.GetHeroesInfo();
            return Ok(_mapper.Map<IEnumerable<HeroDto>>(heroesModel));
        }
    }
}
