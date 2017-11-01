using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

namespace EveHelper.API
{
    public static class Helpers
    {
        public async static Task<(string name, string json)> YamlToJson(string path)
        {
            var sw = Stopwatch.StartNew();
            FileInfo fi = new FileInfo(path);
            string size = string.Empty;
            int objects = 0;
            try
            {
                if (!fi.Exists) throw new FileNotFoundException();

                size = BytesToString(fi.Length);

                using (FileStream fileStream = System.IO.File.OpenRead(path))
                using (StreamReader sr = new StreamReader(fileStream))
                {
                    var deserializer = new DeserializerBuilder().WithNamingConvention(new CamelCaseNamingConvention()).Build();
                    var mapping = deserializer.Deserialize(sr);

                    var enumMapping = mapping as System.Collections.ICollection;
                    if (enumMapping != null) objects = enumMapping.Count;
                    else { Debug.WriteLine($"{path} - Unable to cast mapping on {path}"); }

                    Newtonsoft.Json.JsonSerializer js = new Newtonsoft.Json.JsonSerializer();
                    js.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;


                    var w = new StringWriter();

                    js.Serialize(w, mapping);

                    return await Task.FromResult((fi.Directory.Name + "." + Path.GetFileNameWithoutExtension(fi.FullName), w.ToString()));
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }
            finally
            {
                sw.Stop();
                Debug.WriteLine($"{path} ({size} - {objects} objects) took {sw.ElapsedMilliseconds} ms", "Parsing");
            }
            return (null, null);
        }

        static String BytesToString(long byteCount)
        {
            string[] suf = { "B", "KB", "MB", "GB", "TB", "PB", "EB" }; //Longs run out around EB
            if (byteCount == 0)
                return "0" + suf[0];
            long bytes = Math.Abs(byteCount);
            int place = Convert.ToInt32(Math.Floor(Math.Log(bytes, 1024)));
            double num = Math.Round(bytes / Math.Pow(1024, place), 1);
            return (Math.Sign(byteCount) * num).ToString() + suf[place];
        }
    }
}
