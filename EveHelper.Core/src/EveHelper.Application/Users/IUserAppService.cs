using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using EveHelper.Roles.Dto;
using EveHelper.Users.Dto;

namespace EveHelper.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);
    }
}
