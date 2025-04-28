using AutoMapper;
using DotaMaster.Application.Models;
using DotaMaster.Data.Repositories;

namespace DotaMaster.Application.Services
{
    public class ItemService(ItemRepository itemRepository, IMapper mapper)
    {
        private readonly ItemRepository _itemRepository = itemRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<ItemModel>> Get()
        {
            var items = await _itemRepository.GetAllItemsAsync();
            return _mapper.Map<IEnumerable<ItemModel>>(items);
        }
    }
}
