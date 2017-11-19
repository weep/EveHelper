using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace EveHelper.API.GenericHelpers
{
    public static class HttpClientHelper
    {
        public static async Task<List<T>> GetObjects<T>(Uri uri, string authHeader)
        {
            var data = new List<T>();
            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authHeader);

                httpClient.MaxResponseContentBufferSize = int.MaxValue;

                try
                {
                    var response = await httpClient.GetAsync(uri);
                    if (response.IsSuccessStatusCode)
                    {
                        var content = await response.Content.ReadAsStringAsync();
                        data = JsonConvert.DeserializeObject<List<T>>(content);
                    }
                }
                catch
                {
                    throw new HttpRequestException();
                }
            }

            return data;
        }
    }
}
