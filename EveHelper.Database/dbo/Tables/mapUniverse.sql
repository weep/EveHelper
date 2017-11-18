CREATE TABLE [dbo].[mapUniverse] (
    [universeID]   INT           NOT NULL,
    [universeName] VARCHAR (100) NULL,
    [x]            FLOAT (53)    NULL,
    [y]            FLOAT (53)    NULL,
    [z]            FLOAT (53)    NULL,
    [xMin]         FLOAT (53)    NULL,
    [xMax]         FLOAT (53)    NULL,
    [yMin]         FLOAT (53)    NULL,
    [yMax]         FLOAT (53)    NULL,
    [zMin]         FLOAT (53)    NULL,
    [zMax]         FLOAT (53)    NULL,
    [radius]       FLOAT (53)    NULL,
    PRIMARY KEY CLUSTERED ([universeID] ASC)
);

