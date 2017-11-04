using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace EveHelper.Db.Models
{
    public class CharacterModel
    {
        [BsonId]
        public string Id { get; set; }
        public string Name { get; set; }
        public string PortraitUrl { get; set; }
    }
}
