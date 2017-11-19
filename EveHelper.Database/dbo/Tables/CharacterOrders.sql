CREATE TABLE [dbo].[CharacterOrders] (
    [order_id]      BIGINT          NOT NULL,
    [type_id]       BIGINT          NOT NULL,
    [region_id]     BIGINT          NOT NULL,
    [location_id]   BIGINT          NOT NULL,
    [range]         NVARCHAR (16)   NOT NULL,
    [is_buy_order]  BIT             NOT NULL,
    [price]         DECIMAL (18, 2) NOT NULL,
    [volume_total]  BIGINT          NOT NULL,
    [volume_remain] BIGINT          NOT NULL,
    [issued]        DATETIME        NOT NULL,
    [state]         NVARCHAR (16)   NOT NULL,
    [min_volume]    BIGINT          NOT NULL,
    [account_id]    BIGINT          NOT NULL,
    [character_id]  BIGINT          NOT NULL,
    [duration]      BIGINT          NOT NULL,
    [is_corp]       BIT             NOT NULL,
    [escrow]        DECIMAL (18, 2) NOT NULL,
    CONSTRAINT [PK_CharacterOrders] PRIMARY KEY CLUSTERED ([order_id] ASC)
);

