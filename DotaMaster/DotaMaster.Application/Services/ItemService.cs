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
    public class ItemService
    {
        private readonly ItemRepository _itemRepository;
        private readonly IMapper _mapper;

        public ItemService(ItemRepository itemRepository, IMapper mapper)
        {
            _itemRepository = itemRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ItemModel>> GetAllItems()
        {
            var items = await _itemRepository.GetAllItemsAsync();
            return _mapper.Map<IEnumerable<ItemModel>>(items);
        }
    }
}
