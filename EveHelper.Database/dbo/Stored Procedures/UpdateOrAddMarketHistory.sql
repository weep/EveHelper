-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE UpdateOrAddMarketHistory
	-- Add the parameters for the stored procedure here
	@region_id BIGINT, 
	@type_id BIGINT,
	@average BIGINT,
	@highest DECIMAL(18,2),
	@lowest DECIMAL(18,2),
	@volume BIGINT,
	@order_count BIGINT,
	@date DATE
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here

	IF EXISTS(SELECT TOP 1 1 FROM dbo.MarketHistory WHERE region_id = @region_id and "type_id" = @type_id and "date" = @date)
	BEGIN
		UPDATE mh SET mh.average = @average, mh.highest = @highest, mh.lowest = @lowest, mh.order_count = @order_count, mh.volume = @volume
		FROM dbo.MarketHistory AS mh 
		WHERE region_id = @region_id and "type_id" = @type_id and "date" = @date
	END
	ELSE
	BEGIN
		INSERT INTO dbo.MarketHistory(region_id, [type_id], [date], order_count, volume, highest, average, lowest)
		VALUES (
			@region_id,
			@type_id,
			@date,
			@order_count,
			@volume,
			@highest,
			@average,
			@lowest
		)
	END
END