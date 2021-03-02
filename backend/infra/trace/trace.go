package trace

import (
	"context"

	"github.com/opentracing/opentracing-go"
)

// OpenTracer defines service tracer with Connect/Close options on demand and not on creation
type OpenTracer interface {
	Connect(ctx context.Context) error
	Tracer() opentracing.Tracer
	Close(ctx context.Context) error
}
