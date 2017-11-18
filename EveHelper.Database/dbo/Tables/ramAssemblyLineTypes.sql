CREATE TABLE [dbo].[ramAssemblyLineTypes] (
    [assemblyLineTypeID]     INT            NOT NULL,
    [assemblyLineTypeName]   VARCHAR (100)  NULL,
    [description]            VARCHAR (1000) NULL,
    [baseTimeMultiplier]     FLOAT (53)     NULL,
    [baseMaterialMultiplier] FLOAT (53)     NULL,
    [baseCostMultiplier]     FLOAT (53)     NULL,
    [volume]                 FLOAT (53)     NULL,
    [activityID]             INT            NULL,
    [minCostPerHour]         FLOAT (53)     NULL,
    PRIMARY KEY CLUSTERED ([assemblyLineTypeID] ASC)
);

