using Abp.Application.Services;
using Abp.Application.Services.Dto;
using EveHelper.MultiTenancy.Dto;

namespace EveHelper.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}
