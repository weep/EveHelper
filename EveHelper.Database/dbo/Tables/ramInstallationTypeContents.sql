CREATE TABLE [dbo].[ramInstallationTypeContents] (
    [installationTypeID] INT NOT NULL,
    [assemblyLineTypeID] INT NOT NULL,
    [quantity]           INT NULL,
    PRIMARY KEY CLUSTERED ([installationTypeID] ASC, [assemblyLineTypeID] ASC)
);

