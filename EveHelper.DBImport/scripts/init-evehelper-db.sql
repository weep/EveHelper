CREATE USER evehelper;
CREATE DATABASE evehelper;
GRANT ALL PRIVILEGES ON DATABASE evehelper TO evehelper;

--CREATE ROLE yaml;
--GRANT ALL PRIVILEGES ON DATABASE evehelper TO yaml;




--exec pg_restore -d evehelper -F c /app/postgres-latest.dmp;
