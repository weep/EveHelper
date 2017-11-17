CREATE TABLE [dbo].[mapLandmarks] (
    [landmarkID]   INT            NOT NULL,
    [landmarkName] VARCHAR (100)  NULL,
    [description]  NVARCHAR (MAX) NULL,
    [locationID]   INT            NULL,
    [x]            FLOAT (53)     NULL,
    [y]            FLOAT (53)     NULL,
    [z]            FLOAT (53)     NULL,
    [iconID]       INT            NULL,
    PRIMARY KEY CLUSTERED ([landmarkID] ASC)
);

