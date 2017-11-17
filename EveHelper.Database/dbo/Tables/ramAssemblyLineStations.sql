CREATE TABLE [dbo].[ramAssemblyLineStations] (
    [stationID]          INT NOT NULL,
    [assemblyLineTypeID] INT NOT NULL,
    [quantity]           INT NULL,
    [stationTypeID]      INT NULL,
    [ownerID]            INT NULL,
    [solarSystemID]      INT NULL,
    [regionID]           INT NULL,
    PRIMARY KEY CLUSTERED ([stationID] ASC, [assemblyLineTypeID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [ix_ramAssemblyLineStations_solarSystemID]
    ON [dbo].[ramAssemblyLineStations]([solarSystemID] ASC);


GO
CREATE NONCLUSTERED INDEX [ix_ramAssemblyLineStations_regionID]
    ON [dbo].[ramAssemblyLineStations]([regionID] ASC);


GO
CREATE NONCLUSTERED INDEX [ix_ramAssemblyLineStations_ownerID]
    ON [dbo].[ramAssemblyLineStations]([ownerID] ASC);

