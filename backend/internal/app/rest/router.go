package rest

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/google/wire"

	"github.com/robinshi007/cx-tasks/infra/log"
	"github.com/robinshi007/cx-tasks/internal/di/provider"
	"github.com/robinshi007/cx-tasks/internal/pkg/http/mw"
	"github.com/robinshi007/cx-tasks/internal/pkg/http/shared"
)

// Rest Router
func NewRestRouter(th TaskHandler, o *provider.AppOptions, logger log.Logger) http.Handler {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(mw.RequestLogger(logger))
	r.Use(middleware.Recoverer)
	r.Use(middleware.URLFormat)

	r.MethodNotAllowed(shared.MethodNotAllowedHandler)
	r.NotFound(shared.NotFoundHandler)

	if o.Mode == "dev" {
		r.Get("/", shared.SayHello)
		r.Get("/log", shared.TestLogger)
	}

	// for REST API use
	r.Route("/api/v1", func(rt chi.Router) {
		rt.Mount("/tasks", NewTaskRouter(th))
	})

	return r
}

var RouterProviderSet = wire.NewSet(NewRestRouter)
