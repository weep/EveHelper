using System.Threading.Tasks;
using EveHelper.Configuration.Dto;

namespace EveHelper.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
