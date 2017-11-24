using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using EveHelper.Configuration;

namespace EveHelper.Web.Host.Startup
{
    [DependsOn(
       typeof(EveHelperWebCoreModule))]
    public class EveHelperWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public EveHelperWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(EveHelperWebHostModule).GetAssembly());
        }
    }
}
