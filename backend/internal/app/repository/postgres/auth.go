package postgres

import (
	"context"

	sq "github.com/Masterminds/squirrel"

	db_int "github.com/robinshi007/cx-tasks/infra/db"
	log_int "github.com/robinshi007/cx-tasks/infra/log"
	"github.com/robinshi007/cx-tasks/internal/domain/model"
	repo_int "github.com/robinshi007/cx-tasks/internal/domain/repository"
)

func NewAuthRepo(dbs db_int.Session, logger log_int.Logger) (repo_int.AuthRepository, error) {
	return (&authRepo{}).With(context.Background(), dbs, logger), nil
}

type authRepo struct {
	*repo
	logger log_int.Logger
}

func (rp *authRepo) With(ctx context.Context, dbs db_int.Session, logger log_int.Logger) repo_int.AuthRepository {
	return &authRepo{
		repo: rp.repo.With(ctx, dbs, logger),
	}
}

func (rp *authRepo) table() string {
	return "users"
}
func (rp *authRepo) columns() []string {
	return []string{
		"t.id",
		"t.user_name",
		"t.email",
		"t.created_at",
		"t.updated_at",
	}
}

func (rp *authRepo) query() sq.SelectBuilder {
	return SQL.Select(rp.columns()...).
		From(rp.table() + " AS t").
		Where("t.deleted_at IS NULL")
}

func (rp *authRepo) FindByID(ctx context.Context, id int64) (*model.User, error) {
	return rp.findOneBy(ctx, "id", id)
}
func (rp *authRepo) FindByName(ctx context.Context, name string) (*model.User, error) {
	return rp.findOneBy(ctx, "name", name)
}
func (rp *authRepo) FindByEmail(ctx context.Context, email string) (*model.User, error) {
	return rp.findOneBy(ctx, "email", email)
}
func (rp *authRepo) FindByToken(ctx context.Context, token string) (*model.User, error) {
	return rp.findOneBy(ctx, "token", token)
}

func (rp *authRepo) findOneBy(ctx context.Context, field string, value interface{}) (*model.User, error) {
	var (
		res = &model.User{}
		q   = rp.query().Where(sq.Eq{"t." + field: value})
		err = rp.FetchOne(q, res)
	)
	if err == nil && res.ID == 0 {
		return nil, model.NewErrEntityNotFound()
	}
	return res, err
}

func (rp *authRepo) UpdatePassword(ctx context.Context, m *model.User) (*model.User, error) {
	return m, rp.UpdateColumns(rp.table(), Set{
		"password":             m.Password,
		"updated_at":           m.UpdatedAt,
		"last_password_change": m.LastPasswordChange,
	}, sq.Eq{"id": m.ID})
}
func (rp *authRepo) UpdateLastLogin(ctx context.Context, m *model.User) (*model.User, error) {
	return m, rp.UpdateColumns(rp.table(), Set{
		"token":      m.Token,
		"last_login": m.LastLogin,
	}, sq.Eq{"id": m.ID})
}
