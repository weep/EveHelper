using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using EveHelper.Configuration.Dto;

namespace EveHelper.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : EveHelperAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
