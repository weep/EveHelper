CREATE TABLE [dbo].[dgmAttributeTypes] (
    [attributeID]   INT            NOT NULL,
    [attributeName] VARCHAR (100)  NULL,
    [description]   VARCHAR (1000) NULL,
    [iconID]        INT            NULL,
    [defaultValue]  FLOAT (53)     NULL,
    [published]     BIT            NULL,
    [displayName]   VARCHAR (150)  NULL,
    [unitID]        INT            NULL,
    [stackable]     BIT            NULL,
    [highIsGood]    BIT            NULL,
    [categoryID]    INT            NULL,
    PRIMARY KEY CLUSTERED ([attributeID] ASC),
    CHECK ([highIsGood]=(1) OR [highIsGood]=(0)),
    CHECK ([published]=(1) OR [published]=(0)),
    CHECK ([stackable]=(1) OR [stackable]=(0))
);

