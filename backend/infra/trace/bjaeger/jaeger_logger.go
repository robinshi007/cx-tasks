package bjaeger

import (
	"context"

	"github.com/uber/jaeger-client-go/config"

	"github.com/robinshi007/cx-tasks/infra/log"
)

// BricksLoggerOption can be added to enable jaeger client debug using mortar logger
func BricksLoggerOption(bricksLogger log.Logger) config.Option {
	if bricksLogger == nil {
		return func(*config.Options) {} // empty option
	}
	return config.Logger(&logWrapper{inner: bricksLogger})
}

type logWrapper struct {
	inner log.Logger
}

func (w *logWrapper) Error(msg string) {
	w.inner.Error(context.Background(), msg)
}
func (w *logWrapper) Infof(msg string, args ...interface{}) {
	w.inner.Info(context.Background(), msg, args...)
}

func (w *logWrapper) Debugf(msg string, args ...interface{}) {
	w.inner.Debug(context.Background(), msg, args...)
}
