FROM alpine:latest

RUN apk update && apk add bash

ADD ./dist/graphql-linux-amd64 /graphql-server
ADD ./conf /conf

ENTRYPOINT ["/graphql-server"]
CMD [ "-configPath", "/"]

EXPOSE 8080
