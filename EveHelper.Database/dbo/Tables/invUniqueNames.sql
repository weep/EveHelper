CREATE TABLE [dbo].[invUniqueNames] (
    [itemID]   INT           NOT NULL,
    [itemName] VARCHAR (200) NOT NULL,
    [groupID]  INT           NULL,
    PRIMARY KEY CLUSTERED ([itemID] ASC)
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [ix_invUniqueNames_itemName]
    ON [dbo].[invUniqueNames]([itemName] ASC);


GO
CREATE NONCLUSTERED INDEX [invUniqueNames_IX_GroupName]
    ON [dbo].[invUniqueNames]([groupID] ASC, [itemName] ASC);

