package usecase

import (
	"context"

	"github.com/robinshi007/cx-tasks/internal/domain/model"
	"github.com/robinshi007/cx-tasks/internal/domain/usecase/in"
	"github.com/robinshi007/cx-tasks/internal/domain/usecase/out"
)

// TaskUsecase -
type TaskUsecase interface {
	Count(ctx context.Context) (int64, error)
	FindAll(ctx context.Context, opt *model.ListOptions) ([]*model.Task, error)
	FindByID(ctx context.Context, input *in.FetchTask) (*model.Task, error)
	FindByName(ctx context.Context, input *in.FetchTaskByName) (*model.Task, error)
	Create(ctx context.Context, input *in.NewTask) (out.ID, error)
	Update(ctx context.Context, input *in.EditTask) (*model.Task, error)
	Delete(ctx context.Context, input *in.FetchTask) error
}
