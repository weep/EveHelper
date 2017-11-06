FROM postgres:latest
RUN mkdir /app
WORKDIR /app

RUN chown postgres:postgres /app

RUN apt-get update && apt-get install ca-certificates wget sudo -y
RUN update-ca-certificates

COPY /backup /app
COPY /scripts /docker-entrypoint-initdb.d
USER postgres
CMD ["postgres"]
