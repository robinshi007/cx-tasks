package handler

import (
	"github.com/99designs/gqlgen/graphql"
	"github.com/google/wire"

	"github.com/robinshi007/cx-tasks/internal/app/graphql/gen"
	"github.com/robinshi007/cx-tasks/internal/app/graphql/resolver"
	ucase "github.com/robinshi007/cx-tasks/internal/domain/usecase"
)

// NewGraphQLSchema -
func NewGraphQLSchema(tuc ucase.TaskUsecase) graphql.ExecutableSchema {
	return gen.NewExecutableSchema(resolver.NewRootResolver(
		tuc,
	))
}

var ProviderSet = wire.NewSet(NewGraphQLSchema)
