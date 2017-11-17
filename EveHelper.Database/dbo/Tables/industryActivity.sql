CREATE TABLE [dbo].[industryActivity] (
    [typeID]     INT NOT NULL,
    [activityID] INT NOT NULL,
    [time]       INT NULL,
    PRIMARY KEY CLUSTERED ([typeID] ASC, [activityID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [ix_industryActivity_activityID]
    ON [dbo].[industryActivity]([activityID] ASC);

