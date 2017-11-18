CREATE TABLE [dbo].[warCombatZones] (
    [combatZoneID]   INT           NOT NULL,
    [combatZoneName] VARCHAR (100) NULL,
    [factionID]      INT           NULL,
    [centerSystemID] INT           NULL,
    [description]    VARCHAR (500) NULL,
    PRIMARY KEY CLUSTERED ([combatZoneID] ASC)
);

