CREATE TABLE [dbo].[staOperations] (
    [activityID]            INT            NULL,
    [operationID]           INT            NOT NULL,
    [operationName]         VARCHAR (100)  NULL,
    [description]           VARCHAR (1000) NULL,
    [fringe]                INT            NULL,
    [corridor]              INT            NULL,
    [hub]                   INT            NULL,
    [border]                INT            NULL,
    [ratio]                 INT            NULL,
    [caldariStationTypeID]  INT            NULL,
    [minmatarStationTypeID] INT            NULL,
    [amarrStationTypeID]    INT            NULL,
    [gallenteStationTypeID] INT            NULL,
    [joveStationTypeID]     INT            NULL,
    PRIMARY KEY CLUSTERED ([operationID] ASC)
);

