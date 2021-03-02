package handler

import (
	"net/http"

	"github.com/99designs/gqlgen/graphql"
	gqlhandler "github.com/99designs/gqlgen/handler"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/google/wire"

	"github.com/robinshi007/cx-tasks/infra/log"
	"github.com/robinshi007/cx-tasks/internal/di/provider"
	"github.com/robinshi007/cx-tasks/internal/pkg/http/mw"
	"github.com/robinshi007/cx-tasks/internal/pkg/http/shared"
)

func NewGraphQLRouter(gqlschema graphql.ExecutableSchema, o *provider.AppOptions, l log.Logger) http.Handler {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(mw.RequestLogger(l))
	r.Use(middleware.Recoverer)
	r.Use(middleware.URLFormat)

	r.MethodNotAllowed(shared.MethodNotAllowedHandler)
	r.NotFound(shared.NotFoundHandler)

	// for GraphQL API
	if o.Mode == "dev" || o.Mode == "prod" {
		r.Get("/", shared.SayHello)
		r.Mount("/play", gqlhandler.Playground("GraphQL Playground", "/api/graphql"))
	}
	r.Mount("/api/graphql", gqlhandler.GraphQL(gqlschema))

	return r
}

var RouterProviderSet = wire.NewSet(NewGraphQLRouter)
