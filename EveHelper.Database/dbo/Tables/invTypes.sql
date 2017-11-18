CREATE TABLE [dbo].[invTypes] (
    [typeID]        INT             NOT NULL,
    [groupID]       INT             NULL,
    [typeName]      VARCHAR (100)   NULL,
    [description]   NVARCHAR (MAX)  NULL,
    [mass]          FLOAT (53)      NULL,
    [volume]        FLOAT (53)      NULL,
    [capacity]      FLOAT (53)      NULL,
    [portionSize]   INT             NULL,
    [raceID]        INT             NULL,
    [basePrice]     DECIMAL (19, 4) NULL,
    [published]     BIT             NULL,
    [marketGroupID] INT             NULL,
    [iconID]        INT             NULL,
    [soundID]       INT             NULL,
    [graphicID]     INT             NULL,
    PRIMARY KEY CLUSTERED ([typeID] ASC),
    CHECK ([published]=(1) OR [published]=(0))
);


GO
CREATE NONCLUSTERED INDEX [ix_invTypes_groupID]
    ON [dbo].[invTypes]([groupID] ASC);

