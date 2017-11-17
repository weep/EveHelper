CREATE TABLE [dbo].[industryActivityProbabilities] (
    [typeID]        INT            NULL,
    [activityID]    INT            NULL,
    [productTypeID] INT            NULL,
    [probability]   DECIMAL (3, 2) NULL
);


GO
CREATE NONCLUSTERED INDEX [ix_industryActivityProbabilities_typeID]
    ON [dbo].[industryActivityProbabilities]([typeID] ASC);


GO
CREATE NONCLUSTERED INDEX [ix_industryActivityProbabilities_productTypeID]
    ON [dbo].[industryActivityProbabilities]([productTypeID] ASC);

