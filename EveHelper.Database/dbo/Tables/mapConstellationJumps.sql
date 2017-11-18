CREATE TABLE [dbo].[mapConstellationJumps] (
    [fromRegionID]        INT NULL,
    [fromConstellationID] INT NOT NULL,
    [toConstellationID]   INT NOT NULL,
    [toRegionID]          INT NULL,
    PRIMARY KEY CLUSTERED ([fromConstellationID] ASC, [toConstellationID] ASC)
);

