CREATE TABLE [dbo].[chrBloodlines] (
    [bloodlineID]            INT            NOT NULL,
    [bloodlineName]          VARCHAR (100)  NULL,
    [raceID]                 INT            NULL,
    [description]            VARCHAR (1000) NULL,
    [maleDescription]        VARCHAR (1000) NULL,
    [femaleDescription]      VARCHAR (1000) NULL,
    [shipTypeID]             INT            NULL,
    [corporationID]          INT            NULL,
    [perception]             INT            NULL,
    [willpower]              INT            NULL,
    [charisma]               INT            NULL,
    [memory]                 INT            NULL,
    [intelligence]           INT            NULL,
    [iconID]                 INT            NULL,
    [shortDescription]       VARCHAR (500)  NULL,
    [shortMaleDescription]   VARCHAR (500)  NULL,
    [shortFemaleDescription] VARCHAR (500)  NULL,
    PRIMARY KEY CLUSTERED ([bloodlineID] ASC)
);

