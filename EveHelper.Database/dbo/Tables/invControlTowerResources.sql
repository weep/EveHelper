CREATE TABLE [dbo].[invControlTowerResources] (
    [controlTowerTypeID] INT        NOT NULL,
    [resourceTypeID]     INT        NOT NULL,
    [purpose]            INT        NULL,
    [quantity]           INT        NULL,
    [minSecurityLevel]   FLOAT (53) NULL,
    [factionID]          INT        NULL,
    PRIMARY KEY CLUSTERED ([controlTowerTypeID] ASC, [resourceTypeID] ASC)
);

