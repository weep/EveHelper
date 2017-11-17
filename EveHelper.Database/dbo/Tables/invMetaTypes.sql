CREATE TABLE [dbo].[invMetaTypes] (
    [typeID]       INT NOT NULL,
    [parentTypeID] INT NULL,
    [metaGroupID]  INT NULL,
    PRIMARY KEY CLUSTERED ([typeID] ASC)
);

