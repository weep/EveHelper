CREATE TABLE [dbo].[invMarketGroups] (
    [marketGroupID]   INT            NOT NULL,
    [parentGroupID]   INT            NULL,
    [marketGroupName] VARCHAR (100)  NULL,
    [description]     VARCHAR (3000) NULL,
    [iconID]          INT            NULL,
    [hasTypes]        BIT            NULL,
    PRIMARY KEY CLUSTERED ([marketGroupID] ASC),
    CHECK ([hasTypes]=(1) OR [hasTypes]=(0))
);

