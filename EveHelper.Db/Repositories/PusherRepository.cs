using EveHelper.Db.Context;
using EveHelper.Db.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Bson.IO;
using System.Diagnostics;

namespace EveHelper.Db.Repositories
{
    public class PusherRepository : MongoContext, IPusherRepository
    {
        public PusherRepository(IOptions<DbSettings> settings) : base(settings)
        {
        }

        public async Task InsertManyAsync(string collectionName, string json)
        {
            using (var jsonReader = new JsonReader(json))
            {
                await _database.DropCollectionAsync(collectionName);
                var collection = _database.GetCollection<BsonDocument>(collectionName);

                IEnumerable<BsonDocument> toInsert = null;

                try
                {
                    if (json[0] != '[')
                    {
                        var document = BsonSerializer.Deserialize<BsonDocument>(json);
                        toInsert = document.Elements.Select(x => x.Value.ToBsonDocument());
                    }
                    else
                    {
                        var serializer = new BsonArraySerializer();
                        var bsonArray = serializer.Deserialize(BsonDeserializationContext.CreateRoot(jsonReader));
                        toInsert = bsonArray.Select(x => x.ToBsonDocument());
                    }

                    await collection.InsertManyAsync(toInsert);
                }
                catch (Exception ex)
                {
                    Debug.WriteLine($"Error writing to {collectionName} - {ex.Message}", "MongoDB");
                }
            }

        }
    }
}
