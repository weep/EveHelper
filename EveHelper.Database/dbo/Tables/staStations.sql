CREATE TABLE [dbo].[staStations] (
    [stationID]                BIGINT        NOT NULL,
    [security]                 FLOAT (53)    NULL,
    [dockingCostPerVolume]     FLOAT (53)    NULL,
    [maxShipVolumeDockable]    FLOAT (53)    NULL,
    [officeRentalCost]         INT           NULL,
    [operationID]              INT           NULL,
    [stationTypeID]            INT           NULL,
    [corporationID]            INT           NULL,
    [solarSystemID]            INT           NULL,
    [constellationID]          INT           NULL,
    [regionID]                 INT           NULL,
    [stationName]              VARCHAR (100) NULL,
    [x]                        FLOAT (53)    NULL,
    [y]                        FLOAT (53)    NULL,
    [z]                        FLOAT (53)    NULL,
    [reprocessingEfficiency]   FLOAT (53)    NULL,
    [reprocessingStationsTake] FLOAT (53)    NULL,
    [reprocessingHangarFlag]   INT           NULL,
    PRIMARY KEY CLUSTERED ([stationID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [ix_staStations_stationTypeID]
    ON [dbo].[staStations]([stationTypeID] ASC);


GO
CREATE NONCLUSTERED INDEX [ix_staStations_solarSystemID]
    ON [dbo].[staStations]([solarSystemID] ASC);


GO
CREATE NONCLUSTERED INDEX [ix_staStations_regionID]
    ON [dbo].[staStations]([regionID] ASC);


GO
CREATE NONCLUSTERED INDEX [ix_staStations_operationID]
    ON [dbo].[staStations]([operationID] ASC);


GO
CREATE NONCLUSTERED INDEX [ix_staStations_corporationID]
    ON [dbo].[staStations]([corporationID] ASC);


GO
CREATE NONCLUSTERED INDEX [ix_staStations_constellationID]
    ON [dbo].[staStations]([constellationID] ASC);

