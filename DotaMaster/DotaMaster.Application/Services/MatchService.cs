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
    public class MatchService
    {
        private readonly MatchRepository _matchRepository;
        private readonly IMapper _mapper;

        public MatchService(MatchRepository matchRepository, IMapper mapper)
        {
            _matchRepository = matchRepository;
            _mapper = mapper;
        }

        public async Task<LaningAnalyzeModel> GetLaningAnalyze(string steamId, string matchId)
        {
            var laningAnalyze = await _matchRepository.GetLaningAnalyzeAsync(long.Parse(matchId), steamId);
            return _mapper.Map<LaningAnalyzeModel>(laningAnalyze);
        }
    }
}
