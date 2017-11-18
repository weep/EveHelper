CREATE TABLE [dbo].[translationTables] (
    [sourceTable]      VARCHAR (200) NOT NULL,
    [destinationTable] VARCHAR (200) NULL,
    [translatedKey]    VARCHAR (200) NOT NULL,
    [tcGroupID]        INT           NULL,
    [tcID]             INT           NULL,
    PRIMARY KEY CLUSTERED ([sourceTable] ASC, [translatedKey] ASC)
);

