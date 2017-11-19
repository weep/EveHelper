using Dapper;
using Dapper.Contrib.Extensions;
using EveHelper.ORM.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace EveHelper.ORM.Models.Market
{
    public class CharacterOrders : EntityModel<CharacterOrdersModel>, IEntityModel<CharacterOrdersModel>
    {
        public CharacterOrders(IDbConnection connection, IMemoryCache memoryCache) : base(connection, memoryCache)
        {
        }

        public override string CreateTableSQL
        {
            get
            {
                return $@"
CREATE TABLE [{Schema}].[{Name}]
(
    [order_id] BIGINT NOT NULL CONSTRAINT [PK_{Name}] PRIMARY KEY,
    [type_id] BIGINT NOT NULL,
    [region_id] BIGINT NOT NULL,
    [location_id] BIGINT NOT NULL,
    [range] nvarchar(16) NOT NULL,
    [is_buy_order] bit NOT NULL,
    [price] DECIMAL(18,2) NOT NULL,
    [volume_total] BIGINT NOT NULL,
    [volume_remain] BIGINT NOT NULL,
    [issued] DATETIME NOT NULL,
    [state] nvarchar(16) NOT NULL,
    [min_volume] BIGINT NOT NULL,
    [account_id] BIGINT NOT NULL,
    [character_id] BIGINT NOT NULL,
    [duration] BIGINT NOT NULL,
    [is_corp] bit NOT NULL,
    [escrow] DECIMAL(18,2) NOT NULL
);";
            }

        }

        public override IEnumerable<CharacterOrdersModel> GetMultiple(object filter)
        {
            var data = _connection
                .Query<CharacterOrdersModel>(
                    $"select * from [{Schema}].[{Name}] where character_id = @characterId",
                    filter,
                    commandType: CommandType.Text, transaction: _transaction)
                .ToList();

            return data;
        }

        public override long Insert(CharacterOrdersModel obj)
        {
            return _connection.Insert(obj);
        }

        public override long Insert(IEnumerable<CharacterOrdersModel> list)
        {
            return _connection.Insert(list, transaction: _transaction);
        }
    }

    [Table("CharacterOrders")]
    public class CharacterOrdersModel
    {
        [ExplicitKey]
        public long order_id { get; set; }
        public long type_id { get; set; }
        public long region_id { get; set; }
        public long location_id { get; set; }
        public string range { get; set; }
        public bool is_buy_order { get; set; }
        public decimal price { get; set; }
        public long volume_total { get; set; }
        public long volume_remain { get; set; }
        public DateTime issued { get; set; }
        public string state { get; set; }
        public int min_volume { get; set; }
        public long account_id { get; set; }
        public long character_id { get; set; }
        public long duration { get; set; }
        public bool is_corp { get; set; }
        public decimal escrow { get; set; }
    }
}
