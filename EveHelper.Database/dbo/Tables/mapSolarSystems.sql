CREATE TABLE [dbo].[mapSolarSystems] (
    [regionID]        INT           NULL,
    [constellationID] INT           NULL,
    [solarSystemID]   INT           NOT NULL,
    [solarSystemName] VARCHAR (100) NULL,
    [x]               FLOAT (53)    NULL,
    [y]               FLOAT (53)    NULL,
    [z]               FLOAT (53)    NULL,
    [xMin]            FLOAT (53)    NULL,
    [xMax]            FLOAT (53)    NULL,
    [yMin]            FLOAT (53)    NULL,
    [yMax]            FLOAT (53)    NULL,
    [zMin]            FLOAT (53)    NULL,
    [zMax]            FLOAT (53)    NULL,
    [luminosity]      FLOAT (53)    NULL,
    [border]          BIT           NULL,
    [fringe]          BIT           NULL,
    [corridor]        BIT           NULL,
    [hub]             BIT           NULL,
    [international]   BIT           NULL,
    [regional]        BIT           NULL,
    [constellation]   BIT           NULL,
    [security]        FLOAT (53)    NULL,
    [factionID]       INT           NULL,
    [radius]          FLOAT (53)    NULL,
    [sunTypeID]       INT           NULL,
    [securityClass]   VARCHAR (2)   NULL,
    PRIMARY KEY CLUSTERED ([solarSystemID] ASC),
    CHECK ([border]=(1) OR [border]=(0)),
    CHECK ([constellation]=(1) OR [constellation]=(0)),
    CHECK ([corridor]=(1) OR [corridor]=(0)),
    CHECK ([fringe]=(1) OR [fringe]=(0)),
    CHECK ([hub]=(1) OR [hub]=(0)),
    CHECK ([international]=(1) OR [international]=(0)),
    CHECK ([regional]=(1) OR [regional]=(0))
);


GO
CREATE NONCLUSTERED INDEX [ix_mapSolarSystems_security]
    ON [dbo].[mapSolarSystems]([security] ASC);


GO
CREATE NONCLUSTERED INDEX [ix_mapSolarSystems_regionID]
    ON [dbo].[mapSolarSystems]([regionID] ASC);


GO
CREATE NONCLUSTERED INDEX [ix_mapSolarSystems_constellationID]
    ON [dbo].[mapSolarSystems]([constellationID] ASC);

