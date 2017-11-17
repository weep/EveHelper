CREATE TABLE [dbo].[planetSchematics] (
    [schematicID]   INT           NOT NULL,
    [schematicName] VARCHAR (255) NULL,
    [cycleTime]     INT           NULL,
    PRIMARY KEY CLUSTERED ([schematicID] ASC)
);

