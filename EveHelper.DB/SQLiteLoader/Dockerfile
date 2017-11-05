FROM node:alpine
COPY . /app
WORKDIR /app
RUN pwd
RUN ls -al
RUN npm install
RUN node ./script.js
RUN cp ./data /artifacts
VOLUME ["/artifacts"]