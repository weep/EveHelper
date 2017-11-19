using EveHelper.API.GenericHelpers;
using EveHelper.ORM.Interfaces;
using EveHelper.ORM.Models.Market;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace EveHelper.API.Controllers
{
    [Produces("application/json")]
    [Route("api/market")]
    public class MarketController : Controller
    {
        readonly IEntityModel<MarketPriceModel> _marketPrices;
        readonly IEntityModel<MarketOrderModel> _marketOrders;
        readonly IEntityModel<MarketHistoryModel> _marketHistory;

        public MarketController(IEntityModel<MarketPriceModel> marketPrices, IEntityModel<MarketOrderModel> marketOrders, IEntityModel<MarketHistoryModel> marketHistory)
        {
            _marketPrices = marketPrices;
            _marketOrders = marketOrders;
            _marketHistory = marketHistory;
        }

        /// <summary>
        /// Get prices for a specific item
        /// </summary>
        /// <param name="id">Item, type_id in the database</param>
        /// <returns></returns>
        [HttpGet("prices")]
        public async Task<IActionResult> GetPrices(int id)
        {
            var resp = _marketPrices.Get(id);

            if (resp == null)
                return NotFound();

            return await Task.FromResult(Json(resp));
        }

        /// <summary>
        /// Updates prices from the market
        /// </summary>
        /// <returns></returns>
        [HttpPost("prices")]
        public async Task<IActionResult> UpdatePrices()
        {
            var authHeader = Request.Headers["Authorization"][0].Split(" ")[1];
            var uri = new Uri($"https://esi.tech.ccp.is/latest/markets/prices/");

            var data = await HttpClientHelper.GetObjects<MarketPriceModel>(uri, authHeader);

            _marketPrices.DeleteAll();
            _marketPrices.Insert(data);

            return Json(data);
        }

        /// <summary>
        /// Gets market orders from a specific region
        /// </summary>
        /// <param name="regionId">RegionId can be found in database table: mapRegions</param>
        /// <returns></returns>
        [HttpPost("orders/{regionId}")]
        public async Task<IActionResult> UpdateOrders(string regionId)
        {
            var authHeader = Request.Headers["Authorization"][0].Split(" ")[1];
            var uri = new Uri($"https://esi.tech.ccp.is/latest/markets/{regionId}/orders");

            var data = await HttpClientHelper.GetObjects<MarketOrderModel>(uri, authHeader);

            _marketOrders.DeleteAll();
            _marketOrders.Insert(data);

            return Json(data);
        }

        /// <summary>
        /// Updates History orders for a specific region and typeid
        /// </summary>
        /// <param name="regionId">RegionId to update for, The Forge is: 10000002</param>
        /// <param name="typeId">TypeId (item) to update for</param>
        /// <returns></returns>
        [HttpPost("history/{regionId}/{typeId}")]
        public async Task<IActionResult> UpdateHistoryOrders(string regionId, string typeId)
        {
            var authHeader = Request.Headers["Authorization"][0].Split(" ")[1];
            var uri = new Uri($"https://esi.tech.ccp.is/latest/markets/{regionId}/history?type_id={typeId}");

            var data = await HttpClientHelper.GetObjects<MarketHistoryModel>(uri, authHeader);

            var filteredData = data.Select(x => new MarketHistoryModel
                {
                    average = x.average,
                    date = x.date,
                    highest = x.highest,
                    lowest = x.lowest,
                    order_count = x.order_count,
                    region_id = long.Parse(regionId),
                    type_id = long.Parse(typeId),
                    volume = x.volume
                });

            _marketHistory.Insert(filteredData);

            return Json(filteredData);
        }

        [HttpGet("history/{regionId}/{typeId}")]
        public async Task<IActionResult> GetHistoryOrders(string regionId, string typeId)
        {
            var resp = _marketHistory.GetMultiple(new { regionId, typeId });

            if (resp == null)
                return NotFound();

            return await Task.FromResult(Json(resp));
        }
    }
}
