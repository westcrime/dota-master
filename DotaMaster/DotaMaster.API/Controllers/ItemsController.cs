using DotaMaster.Application.Models;
using DotaMaster.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace DotaMaster.API.Controllers
{
    [ApiController]
    [Route("items")]
    public class ItemsController(ItemService itemService, ILogger<ItemsController> logger) : ControllerBase
    {
        private readonly ItemService _itemService = itemService;
        private readonly ILogger<ItemsController> _logger = logger;

        [HttpGet]
        public async Task<IEnumerable<ItemModel>> Get()
        {
            _logger.LogInformation("ItemsRequested");
            return await _itemService.Get();
        }
    }
}
