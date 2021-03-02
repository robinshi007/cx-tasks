// +build wireinject

package di

import (
	"github.com/99designs/gqlgen/graphql"
	"github.com/google/wire"

	graphql_handler "github.com/robinshi007/cx-tasks/internal/app/graphql/handler"
	repo_postgres "github.com/robinshi007/cx-tasks/internal/app/repository/postgres"
	"github.com/robinshi007/cx-tasks/internal/app/rest"
	repo_int "github.com/robinshi007/cx-tasks/internal/domain/repository"

	//"github.com/robinshi007/cx-tasks/internal/app/rpc"
	ucase "github.com/robinshi007/cx-tasks/internal/app/usecase"
	"github.com/robinshi007/cx-tasks/internal/dbm"
	pv "github.com/robinshi007/cx-tasks/internal/di/provider"
	"github.com/robinshi007/cx-tasks/internal/pkg/http"
	"github.com/robinshi007/cx-tasks/internal/pkg/rpc"
)

// Infra {{{
var infraProviderSet = wire.NewSet(
	pv.CfgProviderSet,
	pv.OptsProviderSet,
	pv.LogProviderSet,
	pv.DbProviderSet,
	pv.SrzProviderSet,
) // }}}

// User Repo/Usecase/Handler {{{
var userRepoProviderSet = wire.NewSet(
	infraProviderSet,
	repo_postgres.UserProviderSet,
)

func InjectUserRepo(cp string) (repo_int.UserRepository, error) {
	panic(wire.Build(userRepoProviderSet))
} //}}}

// Project Repo/Usecase/Handler {{{
var projectRepoProviderSet = wire.NewSet(
	infraProviderSet,
	repo_postgres.ProjectProviderSet,
)

func InjectProjectRepo(cp string) (repo_int.ProjectRepository, error) {
	panic(wire.Build(projectRepoProviderSet))
} //}}}

// Project Section Repo/Usecase/Handler {{{
var sectionRepoProviderSet = wire.NewSet(
	infraProviderSet,
	repo_postgres.SectionProviderSet,
)

func InjectSectionRepo(cp string) (repo_int.SectionRepository, error) {
	panic(wire.Build(sectionRepoProviderSet))
} //}}}

// Task repo/usecase/handler {{{
var taskRepoProviderSet = wire.NewSet(
	infraProviderSet,
	repo_postgres.TaskProviderSet,
)

func InjectTaskRepo(cp string) (repo_int.TaskRepository, error) {
	panic(wire.Build(taskRepoProviderSet))
}

var taskUsecaseProviderSet = wire.NewSet(
	taskRepoProviderSet,
	ucase.ProviderSet,
)

var taskHandlerProviderSet = wire.NewSet(
	taskUsecaseProviderSet,
	rest.ProviderSet,
)

func InjectTaskHandler(cp string) (rest.TaskHandler, error) {
	panic(wire.Build(taskHandlerProviderSet))
} // }}}

// Graphql Schema {{{
var graphqlSchemaProviderSet = wire.NewSet(
	taskUsecaseProviderSet,
	graphql_handler.ProviderSet,
)

func InjectGraphqlSchema(cp string) (graphql.ExecutableSchema, error) {
	panic(wire.Build(graphqlSchemaProviderSet))
} // }}}

// Rest Server {{{
var restProviderSet = wire.NewSet(
	taskHandlerProviderSet,
	rest.RouterProviderSet,
	http.ProviderSet,
)

func InjectRestServer(cp string) (*http.Server, error) {
	panic(wire.Build(restProviderSet))
} // }}}

// Graphql Server {{{
var graphqlProviderSet = wire.NewSet(
	graphqlSchemaProviderSet,
	graphql_handler.RouterProviderSet,
	http.ProviderSet,
)

func InjectGraphQLServer(cp string) (*http.Server, error) {
	panic(wire.Build(graphqlProviderSet))
} // }}}

// RPC Server {{{
var rpcProviderSet = wire.NewSet(
	taskUsecaseProviderSet,
	rpc.ProviderSet,
)

func InjectRPCServer(cp string) (*rpc.RPCServer, error) {
	panic(wire.Build(rpcProviderSet))
} // }}}

// Migration {{{
var migrationProviderSet = wire.NewSet(
	taskUsecaseProviderSet,
	dbm.MigrationProviderSet,
)

func InjectMigration(cp string) (*dbm.Migration, error) {
	panic(wire.Build(migrationProviderSet))
} // }}}
