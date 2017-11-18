CREATE TABLE [dbo].[agtResearchAgents] (
    [agentID] INT NOT NULL,
    [typeID]  INT NOT NULL,
    PRIMARY KEY CLUSTERED ([agentID] ASC, [typeID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [ix_agtResearchAgents_typeID]
    ON [dbo].[agtResearchAgents]([typeID] ASC);

