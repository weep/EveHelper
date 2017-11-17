CREATE TABLE [dbo].[crpNPCCorporationDivisions] (
    [corporationID] INT NOT NULL,
    [divisionID]    INT NOT NULL,
    [size]          INT NULL,
    PRIMARY KEY CLUSTERED ([corporationID] ASC, [divisionID] ASC)
);

