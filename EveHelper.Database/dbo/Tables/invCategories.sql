CREATE TABLE [dbo].[invCategories] (
    [categoryID]   INT           NOT NULL,
    [categoryName] VARCHAR (100) NULL,
    [iconID]       INT           NULL,
    [published]    BIT           NULL,
    PRIMARY KEY CLUSTERED ([categoryID] ASC),
    CHECK ([published]=(1) OR [published]=(0))
);

