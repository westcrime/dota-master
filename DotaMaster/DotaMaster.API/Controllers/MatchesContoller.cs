﻿using System.Security.Claims;
using DotaMaster.Application.Models.Match;
using DotaMaster.Application.Services;
using DotaMaster.Domain.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace DotaMaster.API.Controllers
{
    [ApiController]
    [Route("matches")]
    public class MatchesContoller : ControllerBase
    {
        private readonly MatchService _matchService;
        private readonly ILogger<MatchesContoller> _logger;

        public MatchesContoller(MatchService matchService, ILogger<MatchesContoller> logger)
        {
            _matchService = matchService;
            _logger = logger;
        }

        [HttpGet()]
        public async Task<MatchModel> Get([FromQuery] string matchId)
        {
            if (User.Identity == null || !User.Identity.IsAuthenticated)
            {
                throw new BadRequestException("User is not authenticated");
            }

            var steamId = (User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? throw new BadRequestException("Steam ID not found in claims")).Split('/').Last();
            if (string.IsNullOrEmpty(steamId))
            {
                throw new BadRequestException("Steam ID not found in claims");
            }

            return await _matchService.Get(steamId, matchId);
        }
    }
}
