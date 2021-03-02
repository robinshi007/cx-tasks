package v1

import (
	"context"

	"github.com/robinshi007/cx-tasks/internal/app/rpc/v1/protocol"
	"github.com/robinshi007/cx-tasks/internal/domain/model"
	"github.com/robinshi007/cx-tasks/internal/domain/usecase"
	"github.com/robinshi007/cx-tasks/internal/pkg/util"
)

type taskService struct {
	taskUsecase usecase.TaskUsecase
}

// NewTaskService -
func NewTaskService(taskUsecase usecase.TaskUsecase) *taskService {
	return &taskService{
		taskUsecase: taskUsecase,
	}
}

func (s *taskService) ListTask(ctx context.Context, in *protocol.ListTaskRequestType) (*protocol.ListTaskResponseType, error) {
	tasks, err := s.taskUsecase.FindAll(ctx, model.DefaultListOptions())
	if err != nil {
		return nil, err
	}
	res := &protocol.ListTaskResponseType{
		Tasks: toTask(tasks),
	}
	return res, nil
}

func toTask(tasks []*model.Task) []*protocol.Task {
	res := make([]*protocol.Task, len(tasks))
	for i, task := range tasks {
		res[i] = &protocol.Task{
			Id:   util.Int642Str(task.ID),
			Name: task.Name,
		}
	}
	return res
}
