CREATE TABLE [dbo].[industryActivitySkills] (
    [typeID]     INT NULL,
    [activityID] INT NULL,
    [skillID]    INT NULL,
    [level]      INT NULL
);


GO
CREATE NONCLUSTERED INDEX [ix_industryActivitySkills_typeID]
    ON [dbo].[industryActivitySkills]([typeID] ASC);


GO
CREATE NONCLUSTERED INDEX [ix_industryActivitySkills_skillID]
    ON [dbo].[industryActivitySkills]([skillID] ASC);


GO
CREATE NONCLUSTERED INDEX [industryActivitySkills_idx1]
    ON [dbo].[industryActivitySkills]([typeID] ASC, [activityID] ASC);

