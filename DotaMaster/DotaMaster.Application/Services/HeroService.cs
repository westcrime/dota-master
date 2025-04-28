using AutoMapper;
using DotaMaster.Application.Models;
using DotaMaster.Data.Repositories;

namespace DotaMaster.Application.Services
{
    public class HeroService(HeroRepository heroRepository, IMapper mapper)
    {
        private readonly HeroRepository _heroRepository = heroRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<HeroModel>> Get()
        {
            var heroes = await _heroRepository.GetHeroes();
            return _mapper.Map<IEnumerable<HeroModel>>(heroes);
        }
    }
}
