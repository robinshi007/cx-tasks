package postgres

import (
	"context"

	"github.com/google/wire"

	sq "github.com/Masterminds/squirrel"

	db_int "github.com/robinshi007/cx-tasks/infra/db"
	log_int "github.com/robinshi007/cx-tasks/infra/log"
	"github.com/robinshi007/cx-tasks/internal/domain/model"
	repo_int "github.com/robinshi007/cx-tasks/internal/domain/repository"
)

func NewProjectRepo(db db_int.Session, logger log_int.Logger) (repo_int.ProjectRepository, error) {
	return (&projectRepo{}).With(context.Background(), db, logger), nil
}

type projectRepo struct {
	//db     *sqlx.DB
	*repo
	logger log_int.Logger
}

func (rp *projectRepo) With(ctx context.Context, dbs db_int.Session, logger log_int.Logger) repo_int.ProjectRepository {
	return &projectRepo{
		repo: rp.repo.With(ctx, dbs, logger),
	}
}

func (rp *projectRepo) table() string {
	return "projects"
}
func (rp *projectRepo) columns() []string {
	return []string{
		"t.id",
		"t.name",
		"t.description",
		"t.created_at",
		"t.updated_at",
		"t.created_by",
		"t.updated_by",
		"t.owner_id",
	}
}

func (rp *projectRepo) query() sq.SelectBuilder {
	return SQL.Select(rp.columns()...).
		From(rp.table() + " AS t").
		Where("t.deleted_at IS NULL")
}
func (rp *projectRepo) queryJoin() sq.SelectBuilder {
	columns := rp.columns()
	columns = append(columns, `o.id "owner.id"`, `o.user_name "owner.user_name"`, `o.email "owner.email"`)
	columns = append(columns, `c.id "created.id"`, `c.user_name "created.user_name"`, `c.email "created.email"`)
	columns = append(columns, `u.id "updated.id"`, `u.user_name "updated.user_name"`, `u.email "updated.email"`)
	return SQL.Select(columns...).
		From(rp.table() + " AS t").Join("users AS o ON t.owner_id=o.id").Join("users AS c ON t.created_by=c.id").
		Join("users AS u ON t.updated_by=u.id").Where("t.deleted_at IS NULL")
}

func (rp *projectRepo) getRelatedSections(ctx context.Context, id int64) (res []*model.Section, err error) {
	columns := []string{"t.id", "t.name", "t.description"}
	query := SQL.Select(columns...).From("sections As t").Where("t.deleted_at IS NULL").Where(sq.Eq{"t.project_id": id})
	err = rp.FetchPaged(query, NewPageFilter(), &res)
	return
}

func (rp *projectRepo) Count(ctx context.Context) (int64, error) {
	return rp.repo.Count(rp.query())
}
func (rp *projectRepo) FindAll(ctx context.Context, opt *model.ListOptions) (res []*model.Project, err error) {
	res = make([]*model.Project, 0)
	err = rp.FetchPaged(rp.query(), NewPageFilter(), &res)
	return
}
func (rp *projectRepo) FindByID(ctx context.Context, id int64) (*model.Project, error) {
	return rp.findOneBy(ctx, "id", id)
}
func (rp *projectRepo) FindByName(ctx context.Context, name string) (*model.Project, error) {
	return rp.findOneBy(ctx, "name", name)
}

func (rp *projectRepo) findOneBy(ctx context.Context, field string, value interface{}) (res *model.Project, err error) {
	res = &model.Project{}
	err = rp.FetchOne(rp.queryJoin().Where(sq.Eq{"t." + field: value}), res)
	if err == nil && res.ID == 0 {
		return nil, model.NewErrEntityNotFound()
	}
	res.Sections, err = rp.getRelatedSections(ctx, res.ID)
	return
}

func (rp *projectRepo) Create(ctx context.Context, project *model.Project) (int64, error) {
	return rp.Insert(rp.table(), Set{
		"name":        project.Name,
		"description": project.Description,
		"is_archived": project.IsArchived,
		"owner_id":    project.OwnerID,
		"created_at":  project.CreatedAt,
		"updated_at":  project.UpdatedAt,
		"created_by":  project.CreatedByID,
		"updated_by":  project.UpdatedByID,
	})
}

func (rp *projectRepo) Update(ctx context.Context, project *model.Project) (*model.Project, error) {
	return project, rp.UpdateColumns(rp.table(), Set{
		"name":        project.Name,
		"description": project.Description,
		"updated_at":  project.UpdatedAt,
		"updated_by":  project.UpdatedByID,
	}, sq.Eq{"id": project.ID})
}
func (rp *projectRepo) Delete(ctx context.Context, m *model.Project) error {
	return rp.UpdateColumns(rp.table(), Set{
		"deleted_at": m.DeletedAt,
		"deleted_by": m.DeletedByID,
	}, sq.Eq{"id": m.ID})
}

func (rp *projectRepo) ExistByName(ctx context.Context, name string) error {
	return nil
}

var ProjectProviderSet = wire.NewSet(NewProjectRepo)
