CREATE TABLE [dbo].[dgmTypeEffects] (
    [typeID]    INT NOT NULL,
    [effectID]  INT NOT NULL,
    [isDefault] BIT NULL,
    PRIMARY KEY CLUSTERED ([typeID] ASC, [effectID] ASC),
    CHECK ([isDefault]=(1) OR [isDefault]=(0))
);

