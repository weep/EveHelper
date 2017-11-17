CREATE TABLE [dbo].[ramAssemblyLineTypeDetailPerCategory] (
    [assemblyLineTypeID] INT        NOT NULL,
    [categoryID]         INT        NOT NULL,
    [timeMultiplier]     FLOAT (53) NULL,
    [materialMultiplier] FLOAT (53) NULL,
    [costMultiplier]     FLOAT (53) NULL,
    PRIMARY KEY CLUSTERED ([assemblyLineTypeID] ASC, [categoryID] ASC)
);

