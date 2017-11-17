CREATE TABLE [dbo].[chrAncestries] (
    [ancestryID]       INT            NOT NULL,
    [ancestryName]     VARCHAR (100)  NULL,
    [bloodlineID]      INT            NULL,
    [description]      VARCHAR (1000) NULL,
    [perception]       INT            NULL,
    [willpower]        INT            NULL,
    [charisma]         INT            NULL,
    [memory]           INT            NULL,
    [intelligence]     INT            NULL,
    [iconID]           INT            NULL,
    [shortDescription] VARCHAR (500)  NULL,
    PRIMARY KEY CLUSTERED ([ancestryID] ASC)
);

