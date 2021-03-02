# Clean architecture with golang

This is the modern golang application template follows the clean architecture guideline.

Current supported GRPC, REST and GraphQL endpoint.

## Features

- Database with Posgresql (sqlx + squirrel)
- Logger (zap)
- REST API (chi)
- GraphQL (gqlgen)
- GRPC API
- Testing (include repository test and handler test)
- [*Todo]Cache with Redis
- [*Todo]File store with Minio
- [*Todo]Message Bus with NATS

## Todos

- [Done]Migrate util with file, [Todo: bundled with pkger]
- [Done]Add cmd for http server with init(config, logger, database, seed data)
- [Done]Add task repository with postgres
- [Done]Add task rest api
- [Done]Add task rest api test
- [Done]Add task graphql api with graphql playground
- [Done]Add print sql logs by use sqlhooks to console in dev mode
- [Done]Add cmd for grpc server
- [Done]Update all error handling to logger
- [Done]Commit the modern golang app template
- [Done]Refine wire for DI
- [Done]Refine the interfaces for infra module refer the "mortar" project
- [Done]Inplement the interfaces for infra module with selected library(viper, zerolog...)
- [Done]Implement repository and db util for sqlx
- [Doing]Implement metric and tracing
- [Done]Add docker compose
- Add object store with minio server
- Add metric, trace
- Add event-driven pipeline, support async message stream (watermill, nats)
- Setup grafana for show graphs(metric, logs)

## Refers

<https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html>
<https://github.com/AkbaraliShaikh/denti>
<https://github.com/hatajoe/8am>
<https://github.com/sagikazarmark/modern-go-application>
<https://github.com/go-masonry/>
<https://github.com/tensor-programming/hex-microservice>
<https://github.com/tensor-programming/go-kit-tutorial>
<https://github.com/sdgmf/go-project-sample>

## License

The MIT License.
