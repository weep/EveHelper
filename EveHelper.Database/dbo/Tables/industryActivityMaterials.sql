CREATE TABLE [dbo].[industryActivityMaterials] (
    [typeID]         INT NULL,
    [activityID]     INT NULL,
    [materialTypeID] INT NULL,
    [quantity]       INT NULL
);


GO
CREATE NONCLUSTERED INDEX [ix_industryActivityMaterials_typeID]
    ON [dbo].[industryActivityMaterials]([typeID] ASC);


GO
CREATE NONCLUSTERED INDEX [industryActivityMaterials_idx1]
    ON [dbo].[industryActivityMaterials]([typeID] ASC, [activityID] ASC);

