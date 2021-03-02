package repository

import (
	"context"

	"github.com/robinshi007/cx-tasks/internal/domain/model"
)

// ProjectRepository -
type ProjectRepository interface {
	Count(ctx context.Context) (int64, error)
	FindAll(ctx context.Context, opt *model.ListOptions) ([]*model.Project, error)
	FindByID(ctx context.Context, id int64) (*model.Project, error)
	FindByName(ctx context.Context, name string) (*model.Project, error)
	Create(ctx context.Context, m *model.Project) (int64, error)
	Update(ctx context.Context, m *model.Project) (*model.Project, error)
	Delete(ctx context.Context, m *model.Project) error
	ExistByName(ctx context.Context, name string) error
}
