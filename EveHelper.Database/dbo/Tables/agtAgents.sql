CREATE TABLE [dbo].[agtAgents] (
    [agentID]       INT NOT NULL,
    [divisionID]    INT NULL,
    [corporationID] INT NULL,
    [locationID]    INT NULL,
    [level]         INT NULL,
    [quality]       INT NULL,
    [agentTypeID]   INT NULL,
    [isLocator]     BIT NULL,
    PRIMARY KEY CLUSTERED ([agentID] ASC),
    CHECK ([isLocator]=(1) OR [isLocator]=(0))
);


GO
CREATE NONCLUSTERED INDEX [ix_agtAgents_locationID]
    ON [dbo].[agtAgents]([locationID] ASC);


GO
CREATE NONCLUSTERED INDEX [ix_agtAgents_corporationID]
    ON [dbo].[agtAgents]([corporationID] ASC);

