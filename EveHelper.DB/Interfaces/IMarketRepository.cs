using EveHelper.DB.Models.Market;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EveHelper.DB.Interfaces
{
    public interface IMarketRepository
    {
        Task<MarketPrice> GetMarketPrice();
        Task<IEnumerable<MarketPrice>> GetMarketPrice(int typeID);
        Task<bool> UpdateMarketPrice(MarketPrice price);
        Task<bool> UpdateMarketPrices(IEnumerable<MarketPrice> prices);
    }
}
