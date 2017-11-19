using EveHelper.ORM.Interfaces;
using EveHelper.ORM.Models.Market;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Data;
using System.Data.SqlClient;

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

            services.AddTransient<IDbConnection>(prov => new SqlConnection(Configuration.GetSection("mssql:ConnectionString").Value));
            services.AddTransient<IEntityModel<MarketPriceModel>, MarketPrice>();
            services.AddTransient<IEntityModel<MarketOrderModel>, MarketOrder>();
            services.AddTransient<IEntityModel<MarketHistoryModel>, MarketHistory>();
            services.AddTransient<IEntityModel<CharacterOrdersModel>, CharacterOrders>();

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
