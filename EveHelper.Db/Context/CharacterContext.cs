using EveHelper.Db.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EveHelper.Db.Context
{
    public class CharacterContext : MongoContext
    {
        public CharacterContext(IOptions<DbSettings> settings) : base(settings)
        {
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
