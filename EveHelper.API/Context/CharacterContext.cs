using EveHelper.API.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EveHelper.API.Context
{
    public class CharacterContext
    {
        private readonly IMongoDatabase _database = null;

        public CharacterContext(IOptions<DbSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            if (client != null)
                _database = client.GetDatabase(settings.Value.Database);
        }

        public IMongoCollection<CharacterModel> Characters
        {
            get
            {
                return _database.GetCollection<CharacterModel>("Character");
            }
        }
    }
}
