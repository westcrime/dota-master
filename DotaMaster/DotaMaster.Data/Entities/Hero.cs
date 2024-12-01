using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.Entities
{
    public class Hero
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LocalizedName { get; set; }
    }
}
