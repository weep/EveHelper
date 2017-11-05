#!/bin/bash

#psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
#    CREATE USER docker;
#    CREATE DATABASE docker;
#    GRANT ALL PRIVILEGES ON DATABASE docker TO docker;
#EOSQL

#psql evehelper -f /app/postgres-latest.dmp

#pg_restore -d evehelper -a /app/postgres-latest.dmp
#
#psql -f globals.sql
#psql -f db-schema.sql evehelper

pg_restore --no-privileges --no-owner -d evehelper -c /app/postgres-schema-latest.dmp
pg_restore --no-privileges --no-owner -d evehelper -c /app/postgres-latest.dmp
