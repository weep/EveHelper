using System.Threading.Tasks;
using Abp.Application.Services;
using EveHelper.Sessions.Dto;

namespace EveHelper.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
