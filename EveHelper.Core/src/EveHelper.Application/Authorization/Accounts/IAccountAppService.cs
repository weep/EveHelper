using System.Threading.Tasks;
using Abp.Application.Services;
using EveHelper.Authorization.Accounts.Dto;

namespace EveHelper.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
