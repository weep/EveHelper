CREATE TABLE [dbo].[invContrabandTypes] (
    [factionID]        INT        NOT NULL,
    [typeID]           INT        NOT NULL,
    [standingLoss]     FLOAT (53) NULL,
    [confiscateMinSec] FLOAT (53) NULL,
    [fineByValue]      FLOAT (53) NULL,
    [attackMinSec]     FLOAT (53) NULL,
    PRIMARY KEY CLUSTERED ([factionID] ASC, [typeID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [ix_invContrabandTypes_typeID]
    ON [dbo].[invContrabandTypes]([typeID] ASC);

