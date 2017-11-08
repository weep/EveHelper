docker cp .\backup\mssql-latest.bak evehelper_mssql_1:/var/opt/mssql/data
docker exec -it evehelper_mssql_1 /opt/mssql-tools/bin/sqlcmd -
