using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.Entities
{
    public class Item
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Cost { get; set; }
        public string IconUrl { get; set; }
        public string Description { get; set; }
    }
}
