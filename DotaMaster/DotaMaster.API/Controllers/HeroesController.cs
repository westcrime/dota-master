using DotaMaster.Application.Models;
using DotaMaster.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace DotaMaster.API.Controllers
{
    [ApiController]
    [Route("heroes")]
    public class HeroesController(HeroService heroService, ILogger<HeroesController> logger) : ControllerBase
    {
        private readonly HeroService _heroService = heroService;
        private readonly ILogger<HeroesController> _logger = logger;

        [HttpGet]
        public async Task<IEnumerable<HeroModel>> Get()
        {
            _logger.LogInformation("Heroes are requested");
            return await _heroService.Get();
        }
    }
}
