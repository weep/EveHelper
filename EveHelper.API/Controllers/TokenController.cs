using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;
using System.Net.Http;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System;
using EveHelper.API.Models;
using System.Text;
using Newtonsoft.Json;

namespace EveHelper.API.Controllers
{
    [Route("api/[controller]")]
    public class TokenController : Controller
    {
        [HttpPost]
        public void Post([FromBody]TokenModel model)
        {
            var url = "https://login.eveonline.com/oauth/token";

            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue(
                        "Basic",
                        Convert.ToBase64String(
                            System.Text.ASCIIEncoding.ASCII.GetBytes(
                                string.Format("{0}:{1}", "clientId", "secret"))));

                var json = JsonConvert.SerializeObject(new
                {
                    grant_type = "authorization_code",
                    code = model.Code
                });

                var response = httpClient.PostAsync(url, new StringContent(json, Encoding.UTF8, "application/json")).Result;
                var responseString = response.Content.ReadAsStringAsync();
            }
        }
    }
}