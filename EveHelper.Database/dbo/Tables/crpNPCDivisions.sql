CREATE TABLE [dbo].[crpNPCDivisions] (
    [divisionID]   INT            NOT NULL,
    [divisionName] VARCHAR (100)  NULL,
    [description]  VARCHAR (1000) NULL,
    [leaderType]   VARCHAR (100)  NULL,
    PRIMARY KEY CLUSTERED ([divisionID] ASC)
);

