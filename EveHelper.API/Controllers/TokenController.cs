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
        private string _clientId;
        private string _secret;

        public TokenController(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
            _clientId = Environment.GetEnvironmentVariable("EVEHELPER_CLIENT_ID", EnvironmentVariableTarget.Machine) ?? "clientid";
            _secret = Environment.GetEnvironmentVariable("EVEHELPER_SECRET", EnvironmentVariableTarget.Machine) ?? "secret";
        }

        [HttpPost]
        public async Task<AccessTokenModel> Post([FromBody]TokenModel model)
        {
            var url = "https://login.eveonline.com/oauth/token";
            var refresh = !string.IsNullOrWhiteSpace(model.RefreshToken);

            if (refresh)
            {
                var json = JsonConvert.SerializeObject(new
                {
                    grant_type = "refresh_token",
                    refresh_token = model.RefreshToken
                });

                var refreshedToken = await EveTokenHttpClient(url, json);

                return refreshedToken;
            }
            else
            {
                var json = JsonConvert.SerializeObject(new
                {
                    grant_type = "authorization_code",
                    code = model.Code
                });

                var newToken = await EveTokenHttpClient(url, json);

                return newToken;
            }
        }

        private async Task<AccessTokenModel> EveTokenHttpClient(string url, string json)
        {
            AccessTokenModel responseTokenModel = null;

            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes(string.Format("{0}:{1}", _clientId, _secret))));

                var response = httpClient.PostAsync(url, new StringContent(json, Encoding.UTF8, "application/json")).Result;
                var responseString = await response.Content.ReadAsStringAsync();

                responseTokenModel = JsonConvert.DeserializeObject<AccessTokenModel>(responseString);
                if (responseTokenModel.access_token == null)
                    return null;
            }

            return responseTokenModel;
        }
    }
}