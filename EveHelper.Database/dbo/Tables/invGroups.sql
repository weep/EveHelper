CREATE TABLE [dbo].[invGroups] (
    [groupID]              INT           NOT NULL,
    [categoryID]           INT           NULL,
    [groupName]            VARCHAR (100) NULL,
    [iconID]               INT           NULL,
    [useBasePrice]         BIT           NULL,
    [anchored]             BIT           NULL,
    [anchorable]           BIT           NULL,
    [fittableNonSingleton] BIT           NULL,
    [published]            BIT           NULL,
    PRIMARY KEY CLUSTERED ([groupID] ASC),
    CHECK ([anchorable]=(1) OR [anchorable]=(0)),
    CHECK ([anchored]=(1) OR [anchored]=(0)),
    CHECK ([fittableNonSingleton]=(1) OR [fittableNonSingleton]=(0)),
    CHECK ([published]=(1) OR [published]=(0)),
    CHECK ([useBasePrice]=(1) OR [useBasePrice]=(0))
);


GO
CREATE NONCLUSTERED INDEX [ix_invGroups_categoryID]
    ON [dbo].[invGroups]([categoryID] ASC);

