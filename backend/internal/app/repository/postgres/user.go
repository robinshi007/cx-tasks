package postgres

import (
	"context"

	sq "github.com/Masterminds/squirrel"
	"github.com/google/wire"

	db_int "github.com/robinshi007/cx-tasks/infra/db"
	log_int "github.com/robinshi007/cx-tasks/infra/log"
	"github.com/robinshi007/cx-tasks/internal/domain/model"
	repo_int "github.com/robinshi007/cx-tasks/internal/domain/repository"
)

func NewUserRepo(dbs db_int.Session, logger log_int.Logger) (repo_int.UserRepository, error) {
	return (&userRepo{}).With(context.Background(), dbs, logger), nil
}

type userRepo struct {
	*repo
}

func (rp *userRepo) With(ctx context.Context, dbs db_int.Session, logger log_int.Logger) repo_int.UserRepository {
	return &userRepo{
		repo: rp.repo.With(ctx, dbs, logger),
	}
}

func (rp *userRepo) table() string {
	return "users"
}
func (rp *userRepo) columns() []string {
	return []string{
		"t.id",
		"t.user_name",
		"t.email",
		"t.password",
		"t.is_active",
		"t.last_login",
		"t.updated_at",
	}
}

func (rp *userRepo) query() sq.SelectBuilder {
	return SQL.Select(rp.columns()...).
		From(rp.table() + " AS t").
		Where("t.deleted_at IS NULL")
}
func (rp *userRepo) getRelatedProjects(ctx context.Context, id int64) (res []*model.Project, err error) {
	columns := []string{"t.id", "t.name", "t.description"}
	query := SQL.Select(columns...).From("projects As t").Where("t.deleted_at IS NULL").Where(sq.Eq{"t.owner_id": id})
	err = rp.FetchPaged(query, NewPageFilter(), &res)
	return
}

func (rp *userRepo) Count(ctx context.Context) (int64, error) {
	return rp.repo.Count(rp.query())
}

func (rp *userRepo) FindAll(ctx context.Context, opt *model.ListOptions) ([]*model.User, error) {

	var (
		users = make([]*model.User, 0)
		q     = rp.query()
		err   = rp.FetchPaged(q, NewPageFilter(), &users)
	)
	return users, err
}

func (rp *userRepo) findOneBy(ctx context.Context, field string, value interface{}) (*model.User, error) {
	var (
		res = &model.User{}
		q   = rp.query().Where(sq.Eq{"t." + field: value})
		err = rp.FetchOne(q, res)
	)
	if err == nil && res.ID == 0 {
		return nil, model.NewErrEntityNotFound()
	}
	res.OwnedProjects, err = rp.getRelatedProjects(ctx, res.ID)
	return res, err
}

//FindAll(ctx context.Context, opt *model.ListOptions) ([]*model.User, error)
func (rp *userRepo) FindByID(ctx context.Context, id int64) (*model.User, error) {
	return rp.findOneBy(ctx, "id", id)
}
func (rp *userRepo) FindByName(ctx context.Context, name string) (*model.User, error) {
	return rp.findOneBy(ctx, "user_name", name)
}
func (rp *userRepo) Create(ctx context.Context, m *model.User) (int64, error) {
	return rp.Insert(rp.table(), Set{
		"user_name":            m.UserName,
		"email":                m.Email,
		"password":             m.Password,
		"is_active":            m.IsActive,
		"last_password_change": m.LastPasswordChange,
		"created_at":           m.CreatedAt,
		"updated_at":           m.UpdatedAt,
	})
}

func (rp *userRepo) Delete(ctx context.Context, m *model.User) error {
	return rp.UpdateColumns(rp.table(), Set{
		"deleted_at": m.DeletedAt,
	}, sq.Eq{"id": m.ID})
}

func (rp *userRepo) ExistByName(ctx context.Context, name string) error {
	return nil
}

var UserProviderSet = wire.NewSet(NewUserRepo)
