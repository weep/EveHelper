using Dapper.Contrib.Extensions;
using EveHelper.DB.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using System.Data;

namespace EveHelper.DB.Models.Market
{
    public class MarketPrice : EntityModel<MarketPriceModel>, IEntityModel<MarketPriceModel>
    {
        public MarketPrice(IDbConnection connection, IMemoryCache memoryCache) : base(connection, memoryCache)
        {
        }

        public override string CreateTableSQL
        {
            get
            {
                return $@"
CREATE TABLE [{Schema}].[{Name}]
(
    [type_id] INT NOT NULL CONSTRAINT [PK_{Name}] PRIMARY KEY,
    [average_price] DECIMAL(18,2) NOT NULL,
    [adjusted_price] DECIMAL(18,2) NOT NULL,
);";
            }

        }
    }

    [Table("MarketPrice")]
    public class MarketPriceModel
    {
        [ExplicitKey]
        public int type_id { get; set; }
        public decimal average_price { get; set; }
        public decimal adjusted_price { get; set; }
    }
}
