CREATE TABLE [dbo].[mapRegionJumps] (
    [fromRegionID] INT NOT NULL,
    [toRegionID]   INT NOT NULL,
    PRIMARY KEY CLUSTERED ([fromRegionID] ASC, [toRegionID] ASC)
);

