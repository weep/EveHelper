CREATE TABLE [dbo].[planetSchematicsTypeMap] (
    [schematicID] INT NOT NULL,
    [typeID]      INT NOT NULL,
    [quantity]    INT NULL,
    [isInput]     BIT NULL,
    PRIMARY KEY CLUSTERED ([schematicID] ASC, [typeID] ASC),
    CHECK ([isInput]=(1) OR [isInput]=(0))
);

