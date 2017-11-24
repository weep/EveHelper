using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace EveHelper.EntityFrameworkCore
{
    public static class EveHelperDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<EveHelperDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<EveHelperDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
