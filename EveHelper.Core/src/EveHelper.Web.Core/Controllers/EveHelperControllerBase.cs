using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace EveHelper.Controllers
{
    public abstract class EveHelperControllerBase: AbpController
    {
        protected EveHelperControllerBase()
        {
            LocalizationSourceName = EveHelperConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
