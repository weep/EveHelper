CREATE TABLE [dbo].[staOperationServices] (
    [operationID] INT NOT NULL,
    [serviceID]   INT NOT NULL,
    PRIMARY KEY CLUSTERED ([operationID] ASC, [serviceID] ASC)
);

