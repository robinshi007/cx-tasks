package resolver

import (
	"github.com/robinshi007/cx-tasks/internal/app/graphql/gen"
	"github.com/robinshi007/cx-tasks/internal/domain/usecase"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

// NewRootResolver -
func NewRootResolver(
	tuc usecase.TaskUsecase,
) gen.Config {
	return gen.Config{
		Resolvers: &Resolver{
			TaskUC: tuc,
		},
	}
}

type Resolver struct {
	TaskUC usecase.TaskUsecase
}
