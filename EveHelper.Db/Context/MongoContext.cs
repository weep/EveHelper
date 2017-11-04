using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EveHelper.Db.Context
{
    public class MongoContext
    {
        protected readonly IMongoDatabase _database = null;

        public MongoContext(IOptions<DbSettings> settings)
        {

            var client = new MongoClient(settings.Value.ConnectionString);
            if (client != null)
                _database = client.GetDatabase(settings.Value.Database);
        }
    }
}
