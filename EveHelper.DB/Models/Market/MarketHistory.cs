using Dapper.Contrib.Extensions;
using EveHelper.DB.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace EveHelper.DB.Models.Market
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
