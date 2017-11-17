CREATE TABLE [dbo].[certCerts] (
    [certID]      INT            NOT NULL,
    [description] NVARCHAR (MAX) NULL,
    [groupID]     INT            NULL,
    [name]        VARCHAR (255)  NULL,
    PRIMARY KEY CLUSTERED ([certID] ASC)
);

