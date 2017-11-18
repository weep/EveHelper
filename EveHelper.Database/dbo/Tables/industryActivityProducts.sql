CREATE TABLE [dbo].[industryActivityProducts] (
    [typeID]        INT NULL,
    [activityID]    INT NULL,
    [productTypeID] INT NULL,
    [quantity]      INT NULL
);


GO
CREATE NONCLUSTERED INDEX [ix_industryActivityProducts_typeID]
    ON [dbo].[industryActivityProducts]([typeID] ASC);


GO
CREATE NONCLUSTERED INDEX [ix_industryActivityProducts_productTypeID]
    ON [dbo].[industryActivityProducts]([productTypeID] ASC);

