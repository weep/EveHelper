CREATE TABLE [dbo].[industryActivityRaces] (
    [typeID]        INT NULL,
    [activityID]    INT NULL,
    [productTypeID] INT NULL,
    [raceID]        INT NULL
);


GO
CREATE NONCLUSTERED INDEX [ix_industryActivityRaces_typeID]
    ON [dbo].[industryActivityRaces]([typeID] ASC);


GO
CREATE NONCLUSTERED INDEX [ix_industryActivityRaces_productTypeID]
    ON [dbo].[industryActivityRaces]([productTypeID] ASC);

