CREATE TABLE [dbo].[MarketHistory] (
    [region_id]   BIGINT          NOT NULL,
    [type_id]     BIGINT          NOT NULL,
    [date]        DATE            NOT NULL,
    [order_count] BIGINT          NULL,
    [volume]      BIGINT          NULL,
    [highest]     DECIMAL (18, 2) NULL,
    [average]     DECIMAL (18, 2) NULL,
    [lowest]      DECIMAL (18, 2) NULL,
    CONSTRAINT [PK_MarketHistory] PRIMARY KEY CLUSTERED ([region_id] ASC, [type_id] ASC, [date] ASC)
);

