CREATE TABLE [dbo].[trnTranslationLanguages] (
    [numericLanguageID] INT           NOT NULL,
    [languageID]        VARCHAR (50)  NULL,
    [languageName]      VARCHAR (200) NULL,
    PRIMARY KEY CLUSTERED ([numericLanguageID] ASC)
);

