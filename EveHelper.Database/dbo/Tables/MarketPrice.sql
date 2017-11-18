CREATE TABLE [dbo].[MarketPrice] (
    [type_id]        INT             NOT NULL,
    [average_price]  DECIMAL (18, 2) NOT NULL,
    [adjusted_price] DECIMAL (18, 2) NOT NULL,
    CONSTRAINT [PK_MarketPrice] PRIMARY KEY CLUSTERED ([type_id] ASC)
);

