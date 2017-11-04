using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Diagnostics;
using Newtonsoft.Json;
using YamlDotNet.Serialization;
using Microsoft.Extensions.Caching.Memory;
using YamlDotNet.Serialization.NamingConventions;
using EveHelper.Db.Interfaces;

namespace EveHelper.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Assets")]
    public class AssetsController : Controller
    {
        IMemoryCache _memoryCache;
        IPusherRepository _repo;

        public AssetsController(IMemoryCache memoryCache, IPusherRepository repo)
        {
            _memoryCache = memoryCache;
            _repo = repo;
        }

        [HttpGet("{*path}")]
        public async Task<IActionResult> Get(string path, string id = "")
        {
            path = path.TrimEnd('/');
            string key = path + (string.IsNullOrWhiteSpace(id) ? "" : "_" + id);
            if (_memoryCache.TryGetValue(key, out IActionResult cachedObj)) return cachedObj;

            try
            {
                FileInfo fi = new FileInfo(Path.Combine("./assets/", path));
                if (!fi.Exists) return NotFound();

                using (FileStream fileStream = System.IO.File.OpenRead(Path.Combine("./assets/", path)))
                using (StreamReader sr = new StreamReader(fileStream))
                {

                    IActionResult result = default(IActionResult);
                    switch (fi.Extension)
                    {
                        case ".yml":
                        case ".yaml":
                            if (!_memoryCache.TryGetValue("file_" + path, out object mapping))
                            {
                                var deserializer = new DeserializerBuilder().WithNamingConvention(new CamelCaseNamingConvention()).Build();
                                mapping = deserializer.Deserialize(sr);
                                _memoryCache.Set("file_" + path, mapping);
                            }

                            Newtonsoft.Json.JsonSerializer js = new Newtonsoft.Json.JsonSerializer();
                            js.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;


                            var w = new StringWriter();

                            if (string.IsNullOrEmpty(id))
                                js.Serialize(w, mapping);
                            else
                                js.Serialize(w, ((Dictionary<object, object>)mapping)[id]);

                            string jsonText = w.ToString();
                            result = Ok(JsonConvert.DeserializeObject(jsonText));

                            break;
                        case ".json":
                            if (_memoryCache.TryGetValue(path, out cachedObj)) return cachedObj;

                            string jsonString = await sr.ReadToEndAsync();
                            result = Ok(JsonConvert.DeserializeObject(jsonString));
                            break;
                        default:
                            using (MemoryStream ms = new MemoryStream())
                            {
                                fileStream.CopyTo(ms);
                                result = File(ms.ToArray(), "text/yaml");
                            }
                            break;
                    }

                    _memoryCache.Set(key, result);
                    return await Task.FromResult(result);
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
                return NotFound();
            }
        }

        [HttpPost("load/{folder?}")]
        public async Task LoadThatShizzle(string folder = "")
        {
            var files = Directory.EnumerateFiles($"./assets/{folder}", "*.yaml", SearchOption.AllDirectories);
            var sw = Stopwatch.StartNew();

            Parallel.ForEach(files, new ParallelOptions
            {
                MaxDegreeOfParallelism = 4
            }, async file =>
            {
                var ret = await Helpers.YamlToJson(file);
                await _repo.InsertManyAsync(ret.name, ret.json);
            });

            sw.Stop();
            Debug.WriteLine($"Parsing of all files took {sw.ElapsedMilliseconds} ms", "AssetsController");

            await Task.CompletedTask;
        }
    }
}