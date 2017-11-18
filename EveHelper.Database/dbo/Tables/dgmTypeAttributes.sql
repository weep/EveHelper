CREATE TABLE [dbo].[dgmTypeAttributes] (
    [typeID]      INT        NOT NULL,
    [attributeID] INT        NOT NULL,
    [valueInt]    INT        NULL,
    [valueFloat]  FLOAT (53) NULL,
    PRIMARY KEY CLUSTERED ([typeID] ASC, [attributeID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [ix_dgmTypeAttributes_attributeID]
    ON [dbo].[dgmTypeAttributes]([attributeID] ASC);

