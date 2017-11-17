CREATE TABLE [dbo].[skinShip] (
    [skinID] INT NULL,
    [typeID] INT NULL
);


GO
CREATE NONCLUSTERED INDEX [ix_skinShip_typeID]
    ON [dbo].[skinShip]([typeID] ASC);


GO
CREATE NONCLUSTERED INDEX [ix_skinShip_skinID]
    ON [dbo].[skinShip]([skinID] ASC);

