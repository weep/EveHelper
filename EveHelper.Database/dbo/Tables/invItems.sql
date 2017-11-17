CREATE TABLE [dbo].[invItems] (
    [itemID]     INT NOT NULL,
    [typeID]     INT NOT NULL,
    [ownerID]    INT NOT NULL,
    [locationID] INT NOT NULL,
    [flagID]     INT NOT NULL,
    [quantity]   INT NOT NULL,
    PRIMARY KEY CLUSTERED ([itemID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [ix_invItems_locationID]
    ON [dbo].[invItems]([locationID] ASC);


GO
CREATE NONCLUSTERED INDEX [items_IX_OwnerLocation]
    ON [dbo].[invItems]([ownerID] ASC, [locationID] ASC);

