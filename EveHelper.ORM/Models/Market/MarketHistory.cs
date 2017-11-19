using Dapper;
using Dapper.Contrib.Extensions;
using EveHelper.ORM.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Linq;

namespace EveHelper.ORM.Models.Market
{
    public class MarketHistory : EntityModel<MarketHistoryModel>, IEntityModel<MarketHistoryModel>
    {
        public MarketHistory(IDbConnection connection, IMemoryCache memoryCache) : base(connection, memoryCache)
        {
        }

        public override string CreateTableSQL
        {
            get
            {
                return $@"
CREATE TABLE [{Schema}].[{Name}]
(
    [region_id] BIGINT NOT NULL,
    [type_id] BIGINT NOT NULL,
    [date] DATE NOT NULL,
    [order_count] BIGINT NULL,
    [volume] BIGINT NULL,
    [highest] DECIMAL(18,2) NULL,
    [average] DECIMAL(18,2) NULL,
    [lowest] DECIMAL(18,2) NULL,
    CONSTRAINT [PK_{Name}] PRIMARY KEY (region_id, type_id, date)
);";
            }

        }

        public override IEnumerable<MarketHistoryModel> GetMultiple(object filter)
        {
            var data = _connection
                .Query<MarketHistoryModel>(
                    $"select * from [{Schema}].[{Name}] where region_id = @regionId and type_id = @typeId",
                    filter,
                    commandType: CommandType.Text, transaction: _transaction)
                .ToList();

            return data;
        }

        public override long Insert(IEnumerable<MarketHistoryModel> model)
        {
            long count = 0;

            foreach (var item in model)
            {
                UpdateOrAddMarketHistory(item);
                count++;
            }

            return count;
        }

        public override long Insert(MarketHistoryModel obj)
        {
            UpdateOrAddMarketHistory(obj);
            return 1;
        }

        private void UpdateOrAddMarketHistory(MarketHistoryModel item)
        {
            _connection
            .Query<MarketHistoryModel>("UpdateOrAddMarketHistory",
                new MarketHistoryModel
                {
                    region_id = item.region_id,
                    type_id = item.type_id,
                    date = item.date,
                    average = item.average,
                    highest = item.highest,
                    lowest = item.lowest,
                    order_count = item.order_count,
                    volume = item.volume
                },
            commandType: CommandType.StoredProcedure, transaction: _transaction);
        }
    }


    [Table("MarketHistory")]
    public class MarketHistoryModel
    {
        [ExplicitKey]
        public long region_id { get; set; }
        [ExplicitKey]
        public long type_id { get; set; }
        [ExplicitKey]
        public DateTime date { get; set; }
        public long order_count { get; set; }
        public long volume { get; set; }
        public decimal highest { get; set; }
        public decimal average { get; set; }
        public decimal lowest { get; set; }
    }
}
