using Dapper.Contrib.Extensions;
using EveHelper.ORM.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Data;
using System.Collections.Generic;

namespace EveHelper.ORM.Models.Market
{
    public class MarketOrder : EntityModel<MarketOrderModel>, IEntityModel<MarketOrderModel>
    {
        public MarketOrder(IDbConnection connection, IMemoryCache memoryCache) : base(connection, memoryCache)
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
    [location_id] BIGINT NOT NULL,
    [volume_total] BIGINT NOT NULL,
    [volume_remain] BIGINT NOT NULL,
    [min_volume] BIGINT NOT NULL,
    [price] DECIMAL(18,2) NOT NULL,
    [is_buy_order] bit NOT NULL,
    [duration] INT NOT NULL,
    [issued] DATETIME NOT NULL,
    [range] nvarchar(16) NOT NULL,
);";
            }

        }

        public override IEnumerable<MarketOrderModel> GetMultiple(object filter)
        {
            throw new NotImplementedException();
        }

        public override long Insert(IEnumerable<MarketOrderModel> list)
        {
            return _connection.Insert(list, transaction: _transaction);
        }

        public override long Insert(MarketOrderModel obj)
        {
            return _connection.Insert(obj);
        }
    }

    [Table("MarketOrder")]
    public class MarketOrderModel
    {
        [ExplicitKey]
        public long order_id { get; set; }
        public long type_id { get; set; }
        public long location_id { get; set; }
        public long volume_total { get; set; }
        public long volume_remain { get; set; }
        public long min_volume { get; set; }
        public decimal price { get; set; }
        public bool is_buy_order { get; set; }
        public int duration { get; set; }
        public DateTime issued { get; set; }
        public string range { get; set; }
    }
}
