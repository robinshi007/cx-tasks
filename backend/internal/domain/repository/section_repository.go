package repository

import (
	"context"

	"github.com/robinshi007/cx-tasks/internal/domain/model"
)

// SectionRepository -
type SectionRepository interface {
	Count(ctx context.Context) (int64, error)
	FindAll(ctx context.Context, opt *model.ListOptions) ([]*model.Section, error)
	FindByID(ctx context.Context, id int64) (*model.Section, error)
	FindByName(ctx context.Context, name string) (*model.Section, error)
	Create(ctx context.Context, m *model.Section) (int64, error)
	Update(ctx context.Context, m *model.Section) (*model.Section, error)
	Delete(ctx context.Context, m *model.Section) error
	ExistByName(ctx context.Context, name string) error
}
