using AutoMapper;
using DotaMaster.API.DTOs;
using DotaMaster.Application.Services;
using Microsoft.AspNetCore.Mvc;

namespace DotaMaster.API.Controllers
{
    [ApiController]
    [Route("items")]
    public class ItemsController : ControllerBase
    {
        private readonly ItemService _itemService;
        private readonly ILogger<ItemsController> _logger;
        private readonly IMapper _mapper;

        public ItemsController(ItemService itemService, ILogger<ItemsController> logger, IMapper mapper)
        {
            _itemService = itemService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllItems()
        {
            var itemModels = await _itemService.GetAllItems();
            return Ok(_mapper.Map<IEnumerable<ItemDto>>(itemModels));
        }
    }
}
