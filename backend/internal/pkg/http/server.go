package http

import (
	"context"
	"fmt"
	"net"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"time"

	"github.com/google/wire"

	"github.com/robinshi007/cx-tasks/infra/log"
	"github.com/robinshi007/cx-tasks/internal/di/provider"
)

// NewServer -
func NewServer(r http.Handler, o *provider.ServerOptions, l log.Logger) *Server {
	srv := &http.Server{
		Addr:           fmt.Sprintf(":%v", o.Rest.Port),
		Handler:        r,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	return &Server{
		port:       o.Rest.Port,
		httpServer: srv,
		logger:     l,
	}
}

type Server struct {
	name       string
	host       string
	port       int
	httpServer *http.Server
	logger     log.Logger
}

func (s *Server) Start(ctx context.Context) error {
	go func() {
		s.logger.Info(ctx, "http server is starting...")
		if err := s.httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			s.logger.Error(ctx, "start http server error: %s", err)
			return
		}
	}()
	go func() {
		// check port available
		target := fmt.Sprintf("localhost:%v", s.port)
		count := 5
		for i := 0; i < count; i++ {
			conn, _ := net.DialTimeout("tcp", net.JoinHostPort("", strconv.Itoa(s.port)), 2*time.Second)
			if conn != nil {
				s.logger.Info(ctx, "http server is started at %s", target)
				break
			}
			if i == count-1 {
				s.logger.Error(ctx, "http server ping is unreached at %s", target)
			}
		}
	}()
	return nil
}

func (s *Server) Stop(ctx context.Context) error {
	s.logger.Info(ctx, "http server is stopping...")
	if err := s.httpServer.Shutdown(ctx); err != nil {
		return fmt.Errorf("http server is stopping error: %w", err)
	}
	return nil
}

func (s *Server) AwaitSignal(ctx context.Context) {
	kill := make(chan os.Signal, 1)
	signal.Notify(kill, os.Interrupt, os.Kill)

	select {
	case sig := <-kill:
		s.logger.Info(ctx, "received a os signal: %s", sig.String())
		if err := s.Stop(ctx); err != nil {
			s.logger.Error(ctx, "stop http server error: %s", err)
			return
		}
		s.logger.Info(ctx, "http server stopping: done")
		os.Exit(0)
	}
}

var ProviderSet = wire.NewSet(NewServer)
