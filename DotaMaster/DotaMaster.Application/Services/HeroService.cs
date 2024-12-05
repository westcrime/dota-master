using AutoMapper;
using DotaMaster.Application.Models;
using DotaMaster.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Application.Services
{
    public class HeroService
    {
        private readonly HeroRepository _heroRepository;
        private readonly IMapper _mapper;

        public HeroService(HeroRepository heroRepository, IMapper mapper)
        {
            _heroRepository = heroRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<HeroModel>> GetHeroesInfo()
        {
            var heroes = await _heroRepository.GetHeroesInfo();
            return _mapper.Map<IEnumerable<HeroModel>>(heroes);
        }
    }
}
