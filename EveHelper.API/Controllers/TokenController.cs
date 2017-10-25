using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;
using System.Net.Http;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System;
using EveHelper.API.Models;
using System.Text;
using Newtonsoft.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.AspNetCore.Http;

namespace EveHelper.API.Controllers
{
    [Route("api/[controller]")]
    public class TokenController : Controller
    {
        private IMemoryCache _cache;

        public TokenController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }

        [HttpGet("character")]
        public async Task<HttpResponseMessage> Character()
        {
            using (var httpClient = new HttpClient())
            {
                var request = new HttpRequestMessage
                {
                    RequestUri = new Uri("https://login.eveonline.com/oauth/verify"),
                    Method = HttpMethod.Get
                };
                //Request.Headers
                return await httpClient.SendAsync(request);
            }
        }

        [HttpPost]
        public async Task<AccessTokenModel> Post([FromBody]TokenModel model)
        {
            var url = "https://login.eveonline.com/oauth/token";

            AccessTokenModel responseTokenModel = null;

            // Look for cache key.
            if (!_cache.TryGetValue(model.Code, out responseTokenModel))
            {
                using (var httpClient = new HttpClient())
                {
                    httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    httpClient.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue(
                            "Basic",
                            Convert.ToBase64String(
                                System.Text.ASCIIEncoding.ASCII.GetBytes(
                                    string.Format("{0}:{1}", "clientid", "secret"))));

                    var json = JsonConvert.SerializeObject(new
                    {
                        grant_type = "authorization_code",
                        code = model.Code
                    });

                    var response = httpClient.PostAsync(url, new StringContent(json, Encoding.UTF8, "application/json")).Result;
                    var responseString = await response.Content.ReadAsStringAsync();
                    responseTokenModel = JsonConvert.DeserializeObject<AccessTokenModel>(responseString);
                    if (responseTokenModel.access_token == null)
                        return null;

                    // Set cache options.
                    var cacheEntryOptions = new MemoryCacheEntryOptions()
                        // Keep in cache for this time, reset time if accessed.
                        .SetSlidingExpiration(TimeSpan.FromSeconds(responseTokenModel.expires_in));

                    // Save data in cache.
                    _cache.Set(model.Code, responseTokenModel, cacheEntryOptions);
                }
            }

            return responseTokenModel;
        }
    }
}