package repository

import (
	"context"

	"github.com/robinshi007/cx-tasks/internal/domain/model"
)

type AuthRepository interface {
	FindByID(ctx context.Context, id int64) (*model.User, error)
	FindByName(ctx context.Context, name string) (*model.User, error)
	FindByEmail(ctx context.Context, email string) (*model.User, error)
	FindByToken(ctx context.Context, token string) (*model.User, error)
	UpdatePassword(ctx context.Context, t *model.User) (*model.User, error)
	UpdateLastLogin(ctx context.Context, t *model.User) (*model.User, error)
}
