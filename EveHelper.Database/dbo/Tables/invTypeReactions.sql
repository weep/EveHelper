CREATE TABLE [dbo].[invTypeReactions] (
    [reactionTypeID] INT NOT NULL,
    [input]          BIT NOT NULL,
    [typeID]         INT NOT NULL,
    [quantity]       INT NULL,
    PRIMARY KEY CLUSTERED ([reactionTypeID] ASC, [input] ASC, [typeID] ASC),
    CHECK ([input]=(1) OR [input]=(0))
);

