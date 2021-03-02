package repository

import (
	"context"

	"github.com/robinshi007/cx-tasks/internal/domain/model"
)

// UserRepository -
type UserRepository interface {
	Count(ctx context.Context) (int64, error)
	FindAll(ctx context.Context, opt *model.ListOptions) ([]*model.User, error)
	FindByID(ctx context.Context, id int64) (*model.User, error)
	FindByName(ctx context.Context, name string) (*model.User, error)
	Create(ctx context.Context, m *model.User) (int64, error)
	//UpdatePassword(ctx context.Context, m *model.User) (*model.User, error)
	//UpdateRole(ctx context.Context, m *model.User) (*model.User, error)
	Delete(ctx context.Context, m *model.User) error
	ExistByName(ctx context.Context, name string) error
}
