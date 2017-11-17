CREATE TABLE [dbo].[invFlags] (
    [flagID]   INT           NOT NULL,
    [flagName] VARCHAR (200) NULL,
    [flagText] VARCHAR (100) NULL,
    [orderID]  INT           NULL,
    PRIMARY KEY CLUSTERED ([flagID] ASC)
);

