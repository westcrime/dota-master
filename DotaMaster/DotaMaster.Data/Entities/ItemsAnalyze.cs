using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DotaMaster.Data.Entities
{
    public class ItemsAnalyze
    {
        public ItemsPurchasing[] ItemPurchasingTimings { get; set; }
        public ItemsTimingWinrate[] ItemsTimingWinrates { get; set; }
    }

    public class ItemsPurchasing
    {
        public int ItemId { get; set; }
        public int Timing { get; set; }
    }

    public class ItemsTimingWinrate
    {
        public int ItemId { get; set; }
        public double Winrate { get; set; }
        public int Timing { get; set; }
    }
}
