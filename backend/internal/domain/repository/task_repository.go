package repository

import (
	"context"

	"github.com/robinshi007/cx-tasks/internal/domain/model"
)

// TaskRepository -
type TaskRepository interface {
	Count(ctx context.Context) (int64, error)
	FindAll(ctx context.Context, opt *model.ListOptions) ([]*model.Task, error)
	FindByID(ctx context.Context, id int64) (*model.Task, error)
	FindByName(ctx context.Context, name string) (*model.Task, error)
	Create(ctx context.Context, m *model.Task) (int64, error)
	Update(ctx context.Context, m *model.Task) (*model.Task, error)
	Delete(ctx context.Context, m *model.Task) error
	ExistByName(ctx context.Context, name string) error
}
