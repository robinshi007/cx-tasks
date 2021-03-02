package rpc

import (
	"context"
	"fmt"
	"net"
	"os"
	"os/signal"
	"strconv"
	"time"

	"github.com/google/wire"
	"google.golang.org/grpc"

	"github.com/robinshi007/cx-tasks/infra/log"
	v1 "github.com/robinshi007/cx-tasks/internal/app/rpc/v1"
	"github.com/robinshi007/cx-tasks/internal/domain/usecase"

	"github.com/robinshi007/cx-tasks/internal/di/provider"
)

func NewRPCServer(taskUC usecase.TaskUsecase, o *provider.ServerOptions, l log.Logger) *RPCServer {
	// configJson, _ := json.Marshal(c.Map())
	// l.Debug(context.Background(), string(configJson))
	// port := c.Get(opt.ServerRPCPort).Int()
	serv := grpc.NewServer()
	v1.Apply(serv, taskUC)
	return &RPCServer{
		port:      o.RPC.Port,
		logger:    l,
		rpcServer: serv,
	}
}

type RPCServer struct {
	name      string
	host      string
	port      int
	rpcServer *grpc.Server
	logger    log.Logger
}

func (s *RPCServer) Start(ctx context.Context) error {
	// rpc server
	go func() {
		lis, err := net.Listen("tcp", ":"+strconv.Itoa(s.port))
		if err != nil {
			s.logger.Error(ctx, "Failed to listen on the port :%s", strconv.Itoa(s.port))
		}
		s.logger.Info(ctx, "rpc server is starting...")
		if err := s.rpcServer.Serve(lis); err != nil {
			s.logger.Error(ctx, "start rpc server error: %s", err)
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
				s.logger.Info(ctx, "rpc server is started at %s", target)
				break
			}
		}
	}()
	return nil
}
func (s *RPCServer) Stop(ctx context.Context) error {
	s.logger.Info(ctx, "rpc server is stopping...")
	s.rpcServer.GracefulStop()
	return nil
}
func (s *RPCServer) AwaitSignal(ctx context.Context) {
	kill := make(chan os.Signal, 1)
	signal.Notify(kill, os.Interrupt, os.Kill)

	select {
	case sig := <-kill:
		s.logger.Info(ctx, "received a os signal: %s", sig.String())
		if err := s.Stop(ctx); err != nil {
			s.logger.Error(ctx, "stop rpc server error: %s", err)
			return
		}
		s.logger.Info(ctx, "rpc server stopping: done")
		return
	}
}

var ProviderSet = wire.NewSet(NewRPCServer)
