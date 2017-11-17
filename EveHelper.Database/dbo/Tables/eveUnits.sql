CREATE TABLE [dbo].[eveUnits] (
    [unitID]      INT            NOT NULL,
    [unitName]    VARCHAR (100)  NULL,
    [displayName] VARCHAR (50)   NULL,
    [description] VARCHAR (1000) NULL,
    PRIMARY KEY CLUSTERED ([unitID] ASC)
);

