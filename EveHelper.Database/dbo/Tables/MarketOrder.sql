CREATE TABLE [dbo].[MarketOrder] (
    [order_id]      BIGINT          NOT NULL,
    [type_id]       BIGINT          NOT NULL,
    [location_id]   BIGINT          NOT NULL,
    [volume_total]  BIGINT          NOT NULL,
    [volume_remain] BIGINT          NOT NULL,
    [min_volume]    BIGINT          NOT NULL,
    [price]         DECIMAL (18, 2) NOT NULL,
    [is_buy_order]  BIT             NOT NULL,
    [duration]      INT             NOT NULL,
    [issued]        DATETIME        NOT NULL,
    [range]         NVARCHAR (16)   NOT NULL,
    CONSTRAINT [PK_MarketOrder] PRIMARY KEY CLUSTERED ([order_id] ASC)
);

