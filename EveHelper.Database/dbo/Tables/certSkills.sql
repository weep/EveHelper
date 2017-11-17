CREATE TABLE [dbo].[certSkills] (
    [certID]        INT         NULL,
    [skillID]       INT         NULL,
    [certLevelInt]  INT         NULL,
    [skillLevel]    INT         NULL,
    [certLevelText] VARCHAR (8) NULL
);


GO
CREATE NONCLUSTERED INDEX [ix_certSkills_skillID]
    ON [dbo].[certSkills]([skillID] ASC);

