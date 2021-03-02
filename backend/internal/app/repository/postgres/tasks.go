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

//	repo_int "github.com/robinshi007/cx-tasks/internal/domain/repository"
//	"github.com/robinshi007/cx-tasks/internal/pkg/util"

//type TaskFilter struct {
//	Kind   string
//	Filter string
//	Sort   string
//	// Standard paging fields & helpers
//	PageFilter
//}

func NewTaskRepo(db db_int.Session, logger log_int.Logger) (repo_int.TaskRepository, error) {
	return (&taskRepo{}).With(context.Background(), db, logger), nil
}

type taskRepo struct {
	//db     *sqlx.DB
	*repo
	logger log_int.Logger
}

func (rp *taskRepo) With(ctx context.Context, dbs db_int.Session, logger log_int.Logger) repo_int.TaskRepository {
	return &taskRepo{
		repo: rp.repo.With(ctx, dbs, logger),
	}
}

func (rp *taskRepo) table() string {
	return "tasks"
}
func (rp *taskRepo) columns() []string {
	return []string{
		"t.id",
		"t.name",
		"t.description",
		"t.created_at",
		"t.updated_at",
		"t.created_by",
		"t.updated_by",
		"t.assignee_id",
		"t.project_id",
		"t.section_id",
	}
}

func (rp *taskRepo) query() sq.SelectBuilder {
	return SQL.Select(rp.columns()...).
		From(rp.table() + " AS t").
		Where("t.deleted_at IS NULL")
}
func (rp *taskRepo) queryJoin() sq.SelectBuilder {
	columns := rp.columns()
	columns = append(columns, `a.id "assignee.id"`, `a.user_name "assignee.user_name"`, `a.email "assignee.email"`)
	columns = append(columns, `p.id "project.id"`, `p.name "project.name"`)
	columns = append(columns, `s.id "section.id"`, `s.name "section.name"`)
	return SQL.Select(columns...).
		From(rp.table() + " AS t").
		Join("users AS a ON t.assignee_id=a.id").
		Join("projects AS p ON t.project_id=p.id").
		Join("sections AS s ON t.section_id=s.id").
		Where("t.deleted_at IS NULL")
}

func (rp *taskRepo) Count(ctx context.Context) (int64, error) {
	return rp.repo.Count(rp.query())
}
func (rp *taskRepo) FindAll(ctx context.Context, opt *model.ListOptions) ([]*model.Task, error) {
	var (
		tasks = make([]*model.Task, 0)
		q     = rp.query()
		err   = rp.FetchPaged(q, NewPageFilter(), &tasks)
	)
	return tasks, err
}
func (rp *taskRepo) FindByID(ctx context.Context, id int64) (*model.Task, error) {
	return rp.findOneBy(ctx, "id", id)
}
func (rp *taskRepo) FindByName(ctx context.Context, name string) (*model.Task, error) {
	return rp.findOneBy(ctx, "name", name)
}

func (rp *taskRepo) findOneBy(ctx context.Context, field string, value interface{}) (res *model.Task, err error) {
	res = &model.Task{}
	err = rp.FetchOne(rp.queryJoin().Where(sq.Eq{"t." + field: value}), res)
	if err == nil && res.ID == 0 {
		return nil, model.NewErrEntityNotFound()
	}
	return res, err
}

func (rp *taskRepo) Create(ctx context.Context, task *model.Task) (int64, error) {
	return rp.Insert(rp.table(), Set{
		"name":        task.Name,
		"description": task.Description,
		"is_done":     task.IsDone,
		"is_archived": task.IsArchived,
		"assignee_id": task.AssigneeID,
		"project_id":  task.ProjectID,
		"section_id":  task.SectionID,
		"created_at":  task.CreatedAt,
		"updated_at":  task.UpdatedAt,
		"created_by":  task.CreatedByID,
		"updated_by":  task.UpdatedByID,
	})
}

func (rp *taskRepo) Update(ctx context.Context, task *model.Task) (*model.Task, error) {
	return task, rp.UpdateColumns(rp.table(), Set{
		"name":        task.Name,
		"description": task.Description,
		"updated_at":  task.UpdatedAt,
		"updated_by":  task.UpdatedByID,
	}, sq.Eq{"id": task.ID})
}
func (rp *taskRepo) Delete(ctx context.Context, m *model.Task) error {
	return rp.UpdateColumns(rp.table(), Set{
		"deleted_at": m.DeletedAt,
		"deleted_by": m.DeletedByID,
	}, sq.Eq{"id": m.ID})
}

func (rp *taskRepo) ExistByName(ctx context.Context, name string) error {
	return nil
}

var TaskProviderSet = wire.NewSet(NewTaskRepo)
