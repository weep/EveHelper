using Abp.Authorization;
using EveHelper.Authorization.Roles;
using EveHelper.Authorization.Users;

namespace EveHelper.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
