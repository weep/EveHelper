CREATE TABLE [dbo].[mapDenormalize] (
    [itemID]          INT           NOT NULL,
    [typeID]          INT           NULL,
    [groupID]         INT           NULL,
    [solarSystemID]   INT           NULL,
    [constellationID] INT           NULL,
    [regionID]        INT           NULL,
    [orbitID]         INT           NULL,
    [x]               FLOAT (53)    NULL,
    [y]               FLOAT (53)    NULL,
    [z]               FLOAT (53)    NULL,
    [radius]          FLOAT (53)    NULL,
    [itemName]        VARCHAR (100) NULL,
    [security]        FLOAT (53)    NULL,
    [celestialIndex]  INT           NULL,
    [orbitIndex]      INT           NULL,
    PRIMARY KEY CLUSTERED ([itemID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [mapDenormalize_IX_groupSystem]
    ON [dbo].[mapDenormalize]([groupID] ASC, [solarSystemID] ASC);


GO
CREATE NONCLUSTERED INDEX [mapDenormalize_IX_groupRegion]
    ON [dbo].[mapDenormalize]([groupID] ASC, [regionID] ASC);


GO
CREATE NONCLUSTERED INDEX [mapDenormalize_IX_groupConstellation]
    ON [dbo].[mapDenormalize]([groupID] ASC, [constellationID] ASC);


GO
CREATE NONCLUSTERED INDEX [ix_mapDenormalize_typeID]
    ON [dbo].[mapDenormalize]([typeID] ASC);


GO
CREATE NONCLUSTERED INDEX [ix_mapDenormalize_solarSystemID]
    ON [dbo].[mapDenormalize]([solarSystemID] ASC);


GO
CREATE NONCLUSTERED INDEX [ix_mapDenormalize_regionID]
    ON [dbo].[mapDenormalize]([regionID] ASC);


GO
CREATE NONCLUSTERED INDEX [ix_mapDenormalize_orbitID]
    ON [dbo].[mapDenormalize]([orbitID] ASC);


GO
CREATE NONCLUSTERED INDEX [ix_mapDenormalize_constellationID]
    ON [dbo].[mapDenormalize]([constellationID] ASC);

