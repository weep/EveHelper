using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using EveHelper.Configuration;
using EveHelper.Web;

namespace EveHelper.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class EveHelperDbContextFactory : IDesignTimeDbContextFactory<EveHelperDbContext>
    {
        public EveHelperDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<EveHelperDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            EveHelperDbContextConfigurer.Configure(builder, configuration.GetConnectionString(EveHelperConsts.ConnectionStringName));

            return new EveHelperDbContext(builder.Options);
        }
    }
}
