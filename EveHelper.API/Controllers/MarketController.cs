using EveHelper.DB.Interfaces;
using EveHelper.DB.Models.Market;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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

        [HttpGet("prices")]
        public async Task<IActionResult> GetPrices(int id)
        {
            var resp = _marketPrices.Get(id);

            if (resp == null)
                return NotFound();

            return await Task.FromResult(Json(resp));
        }

        [HttpPost("prices")]
        public async Task<IActionResult> UpdatePrices()
        {
            IEnumerable<MarketPriceModel> ret = null;

            using (var httpClient = new HttpClient())
            {
                var authHeader = Request.Headers["Authorization"][0].Split(" ")[1];
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authHeader);

                var response = await httpClient.GetAsync("https://esi.tech.ccp.is/latest/markets/prices/");
                var responseString = await response.Content.ReadAsStringAsync();

                ret = JsonConvert.DeserializeObject<IEnumerable<MarketPriceModel>>(responseString);

                _marketPrices.DeleteAll();
                _marketPrices.Insert(ret);
            }
            return Json(ret);
        }

        /// <summary>
        /// Gets market orders from a specific region
        /// </summary>
        /// <param name="regionId">RegionId can be found in database table: mapRegions</param>
        /// <returns></returns>
        [HttpPost("orders/{regionId}")]
        public async Task<IActionResult> UpdateOrders(string regionId)
        {
            IEnumerable<MarketOrderModel> ret = null;

            using (var httpClient = new HttpClient())
            {
                var authHeader = Request.Headers["Authorization"][0].Split(" ")[1];
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authHeader);

                var response = await httpClient.GetAsync(string.Format("https://esi.tech.ccp.is/latest/markets/{0}/orders", regionId));
                var responseString = await response.Content.ReadAsStringAsync();

                ret = JsonConvert.DeserializeObject<IEnumerable<MarketOrderModel>>(responseString);

                _marketOrders.DeleteAll();
                _marketOrders.Insert(ret);
            }
            return Json(ret);
        }

        [HttpPost("history/{regionId}/{typeId}")]
        public async Task<IActionResult> UpdateHistoryOrders(string regionId, string typeId)
        {
            IEnumerable<MarketHistoryModel> ret = null;

            using (var httpClient = new HttpClient())
            {
                var authHeader = Request.Headers["Authorization"][0].Split(" ")[1];
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authHeader);

                var url = string.Format("https://esi.tech.ccp.is/latest/markets/{0}/history?type_id={1}", regionId, typeId);
                var response = await httpClient.GetAsync(url);
                var responseString = await response.Content.ReadAsStringAsync();

                ret = JsonConvert.DeserializeObject<IEnumerable<MarketHistoryModel>>(responseString);

                _marketHistory.Insert(ret);
            }

            return Json(ret);
        }
    }
}
