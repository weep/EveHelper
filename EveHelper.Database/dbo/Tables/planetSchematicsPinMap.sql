CREATE TABLE [dbo].[planetSchematicsPinMap] (
    [schematicID] INT NOT NULL,
    [pinTypeID]   INT NOT NULL,
    PRIMARY KEY CLUSTERED ([schematicID] ASC, [pinTypeID] ASC)
);

