CREATE TABLE [dbo].[staStationTypes] (
    [stationTypeID]          INT        NOT NULL,
    [dockEntryX]             FLOAT (53) NULL,
    [dockEntryY]             FLOAT (53) NULL,
    [dockEntryZ]             FLOAT (53) NULL,
    [dockOrientationX]       FLOAT (53) NULL,
    [dockOrientationY]       FLOAT (53) NULL,
    [dockOrientationZ]       FLOAT (53) NULL,
    [operationID]            INT        NULL,
    [officeSlots]            INT        NULL,
    [reprocessingEfficiency] FLOAT (53) NULL,
    [conquerable]            BIT        NULL,
    PRIMARY KEY CLUSTERED ([stationTypeID] ASC),
    CHECK ([conquerable]=(1) OR [conquerable]=(0))
);

