CREATE TABLE [dbo].[chrRaces] (
    [raceID]           INT            NOT NULL,
    [raceName]         VARCHAR (100)  NULL,
    [description]      VARCHAR (1000) NULL,
    [iconID]           INT            NULL,
    [shortDescription] VARCHAR (500)  NULL,
    PRIMARY KEY CLUSTERED ([raceID] ASC)
);

