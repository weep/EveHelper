#!/bin/bash

#wget https://www.fuzzwork.co.uk/dump/postgres-latest.dmp.bz2
#bzip2 -d postgres-latest.dmp.bz2

##wget https://www.fuzzwork.co.uk/dump/postgres-schema-latest.dmp.bz2
bzip2 -d postgres-schema-latest.dmp.bz2

pg_restore --no-privileges --no-owner -d evehelper -c /app/postgres-schema-latest.dmp
#pg_restore --no-privileges --no-owner -d evehelper -c /app/postgres-latest.dmp
