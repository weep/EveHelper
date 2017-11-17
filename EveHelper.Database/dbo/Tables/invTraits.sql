CREATE TABLE [dbo].[invTraits] (
    [traitID]   INT            IDENTITY (1, 1) NOT NULL,
    [typeID]    INT            NULL,
    [skillID]   INT            NULL,
    [bonus]     FLOAT (53)     NULL,
    [bonusText] NVARCHAR (MAX) NULL,
    [unitID]    INT            NULL,
    PRIMARY KEY CLUSTERED ([traitID] ASC)
);

