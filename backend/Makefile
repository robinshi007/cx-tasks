run:
	go run cmd/rest-server/main.go
run_graphql:
	go run cmd/graphql-server/main.go
run_rpc:
	go run cmd/rpc-server/main.go

build_all:
	GOOS=linux GOARCH="amd64" go build -o dist/rest-linux-amd64 ./cmd/rest-server/ && \
	GOOS=linux GOARCH="amd64" go build -o dist/graphql-linux-amd64 ./cmd/graphql-server/ && \
	GOOS=linux GOARCH="amd64" go build -o dist/rpc-linux-amd64 ./cmd/rpc-server/

docker:
	docker-compose -f deployments/docker-compose.yml up --build -d
docker_logs:
	cd deployments && docker-compose logs && cd ..
docker_stop:
	cd deployments && docker-compose stop && cd ..

# code gen
wire:
	cd internal/di && wire && cd - 
gql:
	cd internal/app/graphql && go run github.com/99designs/gqlgen --verbose && cd -
# grpc code gen
protoc:
	protoc --proto_path=. --go_out=plugins=grpc:./ internal/app/rpc/v1/protocol/*.proto
# grpc client
grpcc:
	grpcc --proto internal/app/rpc/v1/protocol/*.proto --address 127.0.0.1:8081 -i
#> client.listTask({}, printReply)
bindata:
	#pkger -include github.com/robinshi007/cx-tasks/internal/dbm/migrations -o internal/dbm
	cd internal/dbm/migrations/postgres && go-bindata -pkg postgres . && cd ../../../..

# test
test: test_model test_db test_rest test_graphql test_infra
	#go test ./...
test_model:
	APP_MODE=test go test github.com/robinshi007/cx-tasks/internal/domain/model
test_db:
	APP_MODE=test go test github.com/robinshi007/cx-tasks/internal/app/repository/postgres
test_rest:
	APP_MODE=test go test github.com/robinshi007/cx-tasks/internal/app/rest
test_graphql:
	APP_MODE=test go test github.com/robinshi007/cx-tasks/internal/app/graphql/handler
test_infra:
	APP_MODE=test go test github.com/robinshi007/cx-tasks/infra/cfg/bviper && \
	APP_MODE=test go test github.com/robinshi007/cx-tasks/infra/log/bzerolog && \
	APP_MODE=test go test github.com/robinshi007/cx-tasks/infra/db/bpostgres

# make ARGS="test" db_create
db_create:
	migrate create -dir internal/dbm/migrations/postgres -ext sql ${ARGS}
db_up:
	migrate -path internal/dbm/migrations/postgres -database postgres://Robin:@localhost:5432/cx-tasks-dev?sslmode=disable up
db_down:
	migrate -path internal/dbm/migrations/postgres -database postgres://Robin:@localhost:5432/cx-tasks-dev?sslmode=disable down
db_force:
	migrate -path internal/dbm/migrations/postgres -database postgres://Robin:@localhost:5432/cx-tasks-dev?sslmode=disable force ${ARGS}
