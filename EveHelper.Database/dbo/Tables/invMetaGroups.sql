CREATE TABLE [dbo].[invMetaGroups] (
    [metaGroupID]   INT            NOT NULL,
    [metaGroupName] VARCHAR (100)  NULL,
    [description]   VARCHAR (1000) NULL,
    [iconID]        INT            NULL,
    PRIMARY KEY CLUSTERED ([metaGroupID] ASC)
);

