CREATE TABLE [dbo].[trnTranslationColumns] (
    [tcGroupID]  INT           NULL,
    [tcID]       INT           NOT NULL,
    [tableName]  VARCHAR (256) NOT NULL,
    [columnName] VARCHAR (128) NOT NULL,
    [masterID]   VARCHAR (128) NULL,
    PRIMARY KEY CLUSTERED ([tcID] ASC)
);

