CREATE TABLE [dbo].[ramActivities] (
    [activityID]   INT            NOT NULL,
    [activityName] VARCHAR (100)  NULL,
    [iconNo]       VARCHAR (5)    NULL,
    [description]  VARCHAR (1000) NULL,
    [published]    BIT            NULL,
    PRIMARY KEY CLUSTERED ([activityID] ASC),
    CHECK ([published]=(1) OR [published]=(0))
);

