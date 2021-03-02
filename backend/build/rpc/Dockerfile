FROM alpine:latest

RUN apk update && apk add bash

ADD ./dist/rpc-linux-amd64 /rpc-server
ADD ./conf /conf

ENTRYPOINT ["/rpc-server"]
CMD [ "-configPath", "/"]

EXPOSE 8081
