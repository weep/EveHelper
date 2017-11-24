using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using EveHelper.Authorization;

namespace EveHelper
{
    [DependsOn(
        typeof(EveHelperCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class EveHelperApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<EveHelperAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(EveHelperApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(cfg =>
            {
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg.AddProfiles(thisAssembly);
            });
        }
    }
}
