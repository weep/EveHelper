using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using EveHelper.Authorization.Roles;
using EveHelper.Authorization.Users;
using EveHelper.MultiTenancy;

namespace EveHelper.EntityFrameworkCore
{
    public class EveHelperDbContext : AbpZeroDbContext<Tenant, Role, User, EveHelperDbContext>
    {
        /* Define an IDbSet for each entity of the application */
        
        public EveHelperDbContext(DbContextOptions<EveHelperDbContext> options)
            : base(options)
        {
        }
    }
}
