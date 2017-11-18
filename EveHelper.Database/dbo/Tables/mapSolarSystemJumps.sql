CREATE TABLE [dbo].[mapSolarSystemJumps] (
    [fromRegionID]        INT NULL,
    [fromConstellationID] INT NULL,
    [fromSolarSystemID]   INT NOT NULL,
    [toSolarSystemID]     INT NOT NULL,
    [toConstellationID]   INT NULL,
    [toRegionID]          INT NULL,
    PRIMARY KEY CLUSTERED ([fromSolarSystemID] ASC, [toSolarSystemID] ASC)
);

