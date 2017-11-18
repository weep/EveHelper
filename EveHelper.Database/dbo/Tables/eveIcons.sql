CREATE TABLE [dbo].[eveIcons] (
    [iconID]      INT            NOT NULL,
    [iconFile]    VARCHAR (500)  NULL,
    [description] NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([iconID] ASC)
);

