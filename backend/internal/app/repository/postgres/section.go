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

func NewSectionRepo(db db_int.Session, logger log_int.Logger) (repo_int.SectionRepository, error) {
	return (&sectionRepo{}).With(context.Background(), db, logger), nil
}

type sectionRepo struct {
	//db     *sqlx.DB
	*repo
	logger log_int.Logger
}

func (rp *sectionRepo) With(ctx context.Context, dbs db_int.Session, logger log_int.Logger) repo_int.SectionRepository {
	return &sectionRepo{
		repo: rp.repo.With(ctx, dbs, logger),
	}
}

func (rp *sectionRepo) table() string {
	return "sections"
}
func (rp *sectionRepo) columns() []string {
	return []string{
		"t.id",
		"t.name",
		"t.description",
		"t.created_at",
		"t.updated_at",
		"t.created_by",
		"t.updated_by",
		"t.project_id",
	}
}

func (rp *sectionRepo) query() sq.SelectBuilder {
	return SQL.Select(rp.columns()...).
		From(rp.table() + " AS t").
		Where("t.deleted_at IS NULL")
}
func (rp *sectionRepo) queryJoin() sq.SelectBuilder {
	columns := rp.columns()
	columns = append(columns, `p.id "project.id"`, `p.name "project.name"`)
	columns = append(columns, `c.id "created.id"`, `c.user_name "created.user_name"`, `c.email "created.email"`)
	columns = append(columns, `u.id "updated.id"`, `u.user_name "updated.user_name"`, `u.email "updated.email"`)
	return SQL.Select(columns...).
		From(rp.table() + " AS t").Join("projects AS p ON t.project_id=p.id").Join("users AS c ON t.created_by=c.id").
		Join("users AS u ON t.updated_by=u.id").Where("t.deleted_at IS NULL")
}

func (rp *sectionRepo) Count(ctx context.Context) (int64, error) {
	return rp.repo.Count(rp.query())
}
func (rp *sectionRepo) FindAll(ctx context.Context, opt *model.ListOptions) ([]*model.Section, error) {
	var (
		sections = make([]*model.Section, 0)
		q        = rp.query()
		err      = rp.FetchPaged(q, NewPageFilter(), &sections)
	)
	return sections, err
}
func (rp *sectionRepo) FindByID(ctx context.Context, id int64) (*model.Section, error) {
	return rp.findOneBy(ctx, "id", id)
}
func (rp *sectionRepo) FindByName(ctx context.Context, name string) (*model.Section, error) {
	return rp.findOneBy(ctx, "name", name)
}

func (rp *sectionRepo) findOneBy(ctx context.Context, field string, value interface{}) (*model.Section, error) {
	var (
		res = &model.Section{}
		q   = rp.queryJoin().Where(sq.Eq{"t." + field: value})
		err = rp.FetchOne(q, res)
	)
	if err == nil && res.ID == 0 {
		return nil, model.NewErrEntityNotFound()
	}
	return res, err
}

func (rp *sectionRepo) Create(ctx context.Context, section *model.Section) (int64, error) {
	return rp.Insert(rp.table(), Set{
		"name":        section.Name,
		"description": section.Description,
		"project_id":  section.ProjectID,
		"created_at":  section.CreatedAt,
		"updated_at":  section.UpdatedAt,
		"created_by":  section.CreatedByID,
		"updated_by":  section.UpdatedByID,
	})
}

func (rp *sectionRepo) Update(ctx context.Context, section *model.Section) (*model.Section, error) {
	return section, rp.UpdateColumns(rp.table(), Set{
		"name":        section.Name,
		"description": section.Description,
		"updated_at":  section.UpdatedAt,
		"updated_by":  section.UpdatedByID,
	}, sq.Eq{"id": section.ID})
}
func (rp *sectionRepo) Delete(ctx context.Context, m *model.Section) error {
	return rp.UpdateColumns(rp.table(), Set{
		"deleted_at": m.DeletedAt,
		"deleted_by": m.DeletedByID,
	}, sq.Eq{"id": m.ID})
}

func (rp *sectionRepo) ExistByName(ctx context.Context, name string) error {
	return nil
}

var SectionProviderSet = wire.NewSet(NewSectionRepo)
