CREATE TABLE [dbo].[invTypeMaterials] (
    [typeID]         INT NOT NULL,
    [materialTypeID] INT NOT NULL,
    [quantity]       INT NOT NULL,
    PRIMARY KEY CLUSTERED ([typeID] ASC, [materialTypeID] ASC)
);

