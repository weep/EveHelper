CREATE TABLE [dbo].[chrAttributes] (
    [attributeID]      INT            NOT NULL,
    [attributeName]    VARCHAR (100)  NULL,
    [description]      VARCHAR (1000) NULL,
    [iconID]           INT            NULL,
    [shortDescription] VARCHAR (500)  NULL,
    [notes]            VARCHAR (500)  NULL,
    PRIMARY KEY CLUSTERED ([attributeID] ASC)
);

