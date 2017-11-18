CREATE TABLE [dbo].[ramAssemblyLineTypeDetailPerGroup] (
    [assemblyLineTypeID] INT        NOT NULL,
    [groupID]            INT        NOT NULL,
    [timeMultiplier]     FLOAT (53) NULL,
    [materialMultiplier] FLOAT (53) NULL,
    [costMultiplier]     FLOAT (53) NULL,
    PRIMARY KEY CLUSTERED ([assemblyLineTypeID] ASC, [groupID] ASC)
);

