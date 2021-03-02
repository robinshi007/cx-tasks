FROM alpine:latest

RUN apk update && apk add bash

ADD ./dist/rest-linux-amd64 /rest-server
ADD ./conf /conf

ENTRYPOINT ["/rest-server"]
CMD [ "-configPath", "/"]

EXPOSE 8080
