-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE GetExistingMarketHistory
	-- Add the parameters for the stored procedure here
	@region_id bigint, 
	@type_id bigint,
	@date date
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * FROM MarketHistory
	WHERE region_id = @region_id and "type_id" = @type_id and "date" = @date
END