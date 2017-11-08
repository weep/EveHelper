docker cp .\backup\mssql-latest.bak evehelper_mssql_1:/opt/db/mssql-latest.bak
docker exec -it evehelper_mssql_1 /opt/mssql-tools/bin/sqlcmd -
