CREATE TABLE [dbo].[eveGraphics] (
    [graphicID]      INT            NOT NULL,
    [sofFactionName] VARCHAR (100)  NULL,
    [graphicFile]    VARCHAR (100)  NULL,
    [sofHullName]    VARCHAR (100)  NULL,
    [sofRaceName]    VARCHAR (100)  NULL,
    [description]    NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([graphicID] ASC)
);

