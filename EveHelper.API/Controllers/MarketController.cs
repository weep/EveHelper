using EveHelper.API.Models;
using EveHelper.DB.Interfaces;
using EveHelper.DB.Models.Market;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace EveHelper.API.Controllers
{
    [Produces("application/json")]
    [Route("api/market")]
    public class MarketController : Controller
    {
        readonly IEntityModel<DB.Models.Market.MarketPriceModel> _marketPrices;

        public MarketController(IEntityModel<DB.Models.Market.MarketPriceModel> marketPrices)
        {
            _marketPrices = marketPrices;
        }

        [HttpGet("")]
        public async Task<IActionResult> Get(int id)
        {
            var resp = _marketPrices.Get(id);

            if (resp == null)
                return NotFound();

            return await Task.FromResult(Json(resp));
        }

        [HttpPost("")]
        public async Task<IActionResult> Update()
        {
            IEnumerable<MarketPriceModel> ret = null;

            using (var httpClient = new HttpClient())
            {
                //HttpRequestHeaders headers = new HttpRequestHeaders();

                //HttpRequestMessage reqm = new HttpRequestMessage
                //{
                //    Method = HttpMethod.Get,
                //    RequestUri = new Uri("https://esi.tech.ccp.is/latest/markets/prices/"),
                //    Headers = new HttpRequestHeaders
                //    {

                //    };
                //};
                //headers

                //Bearer 9RHTOUqvZvJc372jxFFlN7f7coQdZOvGcEJ6TxTwVJa_CaVLV11IJy5XPKdPDVEbITIUnT3jYu3fxW7JSHqWHA2

                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "9RHTOUqvZvJc372jxFFlN7f7coQdZOvGcEJ6TxTwVJa_CaVLV11IJy5XPKdPDVEbITIUnT3jYu3fxW7JSHqWHA2");

                var response = await httpClient.GetAsync("https://esi.tech.ccp.is/latest/markets/prices/");
                var responseString = await response.Content.ReadAsStringAsync();

                ret = JsonConvert.DeserializeObject<IEnumerable<MarketPriceModel>>(responseString);

                _marketPrices.DeleteAll();
                _marketPrices.Insert(ret);
            }
            return Json(ret);
        }
    }
}
