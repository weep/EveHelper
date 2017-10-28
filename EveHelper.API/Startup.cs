using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http;
using EveHelper.API.Interfaces;
using EveHelper.API.Repositories;

namespace EveHelper.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMemoryCache();

            services.Configure<DbSettings>(options =>
            {
                options.ConnectionString = Configuration.GetSection("MongoConnection:ConnectionString").Value;
                options.Database = Configuration.GetSection("MongoConnection:Database").Value;
            });

            services.AddTransient<ICharacterRepository, CharacterRepository>();

            services.AddCors(o => o.AddPolicy("EveHelperPolicy", builder =>
            {
                builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
            }));

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("EveHelperPolicy");

            app.MapWhen(IsProxyPath, builder => builder.RunProxy(new ProxyOptions()
            {
                Scheme = "https",
                Host = "esi.tech.ccp.is",
                Port = "443"
            }));
            
            app.MapWhen(IsOathPath, builder => builder.RunProxy(new ProxyOptions()
            {
                Scheme = "https",
                Host = "login.eveonline.com",
                Port = "443"
            }));

            app.UseMvc();
        }


        private static bool IsProxyPath(HttpContext httpContext)
        {
            return httpContext.Request.Path.Value.StartsWith("/latest/", StringComparison.OrdinalIgnoreCase);
        }

        private static bool IsOathPath(HttpContext httpContext)
        {
            return httpContext.Request.Path.Value.Equals("/oauth/verify", StringComparison.OrdinalIgnoreCase);
        }
    }
}
