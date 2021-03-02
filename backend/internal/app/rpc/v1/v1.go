package v1

import (
	"google.golang.org/grpc"

	"github.com/robinshi007/cx-tasks/internal/app/rpc/v1/protocol"
	"github.com/robinshi007/cx-tasks/internal/domain/usecase"
)

// Apply -
func Apply(server *grpc.Server, service usecase.TaskUsecase) {
	protocol.RegisterTaskServiceServer(server, NewTaskService(service))
}
