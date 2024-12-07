using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Application.Models
{
    public record ItemModel(
        int Id,
        string Title,
        int Cost,
        string IconUrl,
        string Description);
}
