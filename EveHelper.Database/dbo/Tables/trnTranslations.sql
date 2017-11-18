CREATE TABLE [dbo].[trnTranslations] (
    [tcID]       INT            NOT NULL,
    [keyID]      INT            NOT NULL,
    [languageID] VARCHAR (50)   NOT NULL,
    [text]       NVARCHAR (MAX) NOT NULL,
    PRIMARY KEY CLUSTERED ([tcID] ASC, [keyID] ASC, [languageID] ASC)
);

