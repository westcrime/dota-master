using AutoMapper;
using DotaMaster.API.DTOs;
using DotaMaster.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace DotaMaster.API.Controllers
{
    [ApiController]
    [Route("heroes")]
    public class HeroesController : ControllerBase
    {
        private readonly HeroService _heroService;
        private readonly ILogger<HeroesController> _logger;
        private readonly IMapper _mapper;

        public HeroesController(HeroService heroService, ILogger<HeroesController> logger, IMapper mapper)
        {
            _heroService = heroService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> GetHeroesInfo()
        {
            var heroesModel = await _heroService.GetHeroesInfo();
            return Ok(_mapper.Map<IEnumerable<HeroDto>>(heroesModel));
        }
    }
}
