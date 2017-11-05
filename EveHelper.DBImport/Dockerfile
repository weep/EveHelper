FROM postgres:latest
RUN mkdir /app
WORKDIR /app

RUN apt-get update
RUN apt-get install ca-certificates wget -y
RUN apt-get install sudo
RUN update-ca-certificates
RUN wget https://www.fuzzwork.co.uk/dump/postgres-latest.dmp.bz2
RUN wget https://www.fuzzwork.co.uk/dump/postgres-schema-latest.dmp.bz2
RUN bzip2 -d postgres-latest.dmp.bz2
RUN bzip2 -d postgres-schema-latest.dmp.bz2

# inget ovan detta

RUN usermod -aG sudo postgres

COPY /scripts /docker-entrypoint-initdb.d
USER postgres
CMD ["postgres"]
