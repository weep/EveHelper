CREATE TABLE [dbo].[invPositions] (
    [itemID] INT        NOT NULL,
    [x]      FLOAT (53) NOT NULL,
    [y]      FLOAT (53) NOT NULL,
    [z]      FLOAT (53) NOT NULL,
    [yaw]    REAL       NULL,
    [pitch]  REAL       NULL,
    [roll]   REAL       NULL,
    PRIMARY KEY CLUSTERED ([itemID] ASC)
);

