package postgres

import (
	"context"
	"fmt"

	sq "github.com/Masterminds/squirrel"
	"github.com/jmoiron/sqlx"
	"github.com/lann/builder"

	"github.com/robinshi007/cx-tasks/infra/db"
	"github.com/robinshi007/cx-tasks/infra/log"
	"github.com/robinshi007/cx-tasks/internal/domain/model"
)

var (
	SQL sq.StatementBuilderType
)

func init() {
	SQL = sq.StatementBuilder.PlaceholderFormat(sq.Dollar)
}

type repo struct {
	ctx    context.Context
	dbs    db.Session
	logger log.Logger
}

func (r *repo) With(ctx context.Context, dbs db.Session, logger log.Logger) *repo {
	return &repo{
		ctx:    ctx,
		dbs:    dbs,
		logger: logger,
	}
}

func (r *repo) context() context.Context {
	return r.ctx
}

func (r *repo) db() db.Session {
	return r.dbs
}

func (r *repo) dbx() *sqlx.DB {
	return r.dbs.DBX()
}

func (r *repo) Count(q sq.SelectBuilder) (count int64, err error) {
	// Remove order-bys for counting
	q = builder.Delete(q, "OrderBys").(sq.SelectBuilder)
	// Replace columns
	q = builder.Delete(q, "Columns").(sq.SelectBuilder).Column("COUNT(*)")

	if sqlSelect, argsSelect, err := q.ToSql(); err != nil {
		r.logger.Error(context.Background(), fmt.Sprintf("repo.Count sql build error: %v", err))
		return 0, model.NewErrDBBadQuery()
	} else {
		if err := r.db().Get(&count, sqlSelect, argsSelect...); err != nil {
			r.logger.Error(context.Background(), fmt.Sprintf("repo.Count select error: %v", err))
			return 0, model.NewErrDBBadSelect()
		}
	}
	return count, nil
}

func (r *repo) FetchOne(q sq.SelectBuilder, one interface{}) (err error) {
	var (
		sql  string
		args []interface{}
	)
	if sql, args, err = q.ToSql(); err != nil {
		r.logger.Error(context.Background(), fmt.Sprintf("repo.FetchOne sql build error: %v", err))
		return model.NewErrDBBadQuery()
	}
	r.logger.Warn(context.Background(), fmt.Sprintf("%v(%v)", sql, args))
	if err = r.db().Get(one, sql, args...); err != nil {
		r.logger.Error(context.Background(), fmt.Sprintf("repo.FetchOne sql select error: %v", err))
		return model.NewErrDBBadSelect()
	}
	return
}

// FetchPaged fetches paged rows
func (r *repo) FetchPaged(q sq.SelectBuilder, p *PageFilter, set interface{}) error {
	if p.Limit+p.Offset == 0 {
		// When both, offset & limit are 0,
		// calculate both values from page/perPage params
		if p.PerPage > 0 {
			p.Limit = p.PerPage
		}
		if p.Page < 1 {
			p.Page = 1
		}
		p.Offset = (p.Page - 1) * p.PerPage
	}

	if p.Limit > 0 {
		q = q.Limit(uint64(p.Limit))
	}
	if p.Offset > 0 {
		q = q.Offset(uint64(p.Offset))
	}

	return r.FetchAll(q, set)
}

// FetchAll -
func (r *repo) FetchAll(q sq.Sqlizer, set interface{}) error {
	sqlSelect, argsSelect, err := q.ToSql()
	if err != nil {
		r.logger.Error(context.Background(), fmt.Sprintf("repo.FetchAll sql build error: %v", err))
		return model.NewErrDBBadQuery()
	}
	if err = r.db().Select(set, sqlSelect, argsSelect...); err != nil {
		r.logger.Error(context.Background(), fmt.Sprintf("repo.FetchAll sql select error: %v", err))
		return model.NewErrDBBadSelect()
	}
	return nil
}
func (r *repo) Insert(table string, set Set) (id int64, err error) {
	sql, args, err := SQL.Insert(table).
		SetMap(set).
		Suffix("RETURNING \"id\"").ToSql()
	if err != nil {
		r.logger.Error(context.Background(), fmt.Sprintf("repo.Insert sql build error: %v", err))
		return 0, model.NewErrDBBadQuery()
	}
	if err = r.dbx().QueryRowContext(context.Background(), sql, args...).Scan(&id); err != nil {
		r.logger.Error(context.Background(), fmt.Sprintf("repo.Insert sql exec error: %v", err))
		return 0, model.NewErrDBBadExec()
	}
	return id, nil
}

func (r *repo) UpdateColumns(table string, set Set, cnd sq.Sqlizer) error {
	sql, args, err := SQL.Update(table).
		SetMap(set).
		Where(cnd).Where(sq.Eq{"deleted_at": nil}).ToSql()
	if err != nil {
		r.logger.Error(context.Background(), fmt.Sprintf("repo.UpdateColumns sql build error: %v", err))
		return model.NewErrDBBadQuery()
	}
	res, err := r.dbx().ExecContext(context.Background(), sql, args...)
	if err != nil {
		r.logger.Error(context.Background(), fmt.Sprintf("repo.UpdateColumns sql exec error: %v", err))
		return model.NewErrDBBadExec()
	}
	count, _ := res.RowsAffected()
	if count == 0 {
		return model.NewErrEntityNotFound()
	}
	return nil
}
