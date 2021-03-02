package bpostgres

import (
	"context"
	"database/sql"

	"github.com/jmoiron/sqlx"

	"github.com/robinshi007/cx-tasks/infra/db"
	"github.com/robinshi007/cx-tasks/infra/log"
)

type postgresSession struct {
	DB     *sqlx.DB
	logger log.Logger
}

func New(d *sqlx.DB, l log.Logger) *postgresSession {
	return &postgresSession{
		DB:     d,
		logger: l,
	}
}
func (ps *postgresSession) Name() string {
	return ""
}

func (ps *postgresSession) Ping() error {
	return ps.DBX().Ping()
}
func (ps *postgresSession) Close() error {
	return ps.DBX().Close()
}
func (ps *postgresSession) DriverName() string {
	return "postgres"
}

func (ps *postgresSession) Driver() *sql.DB {
	return ps.DBX().DB
}

func (ps *postgresSession) DBX() *sqlx.DB {
	return ps.DB
}

// Get is a helper function that will ignore sql.ErrNoRows
func (ps *postgresSession) Get(dest interface{}, query string, args ...interface{}) (err error) {
	// exec := func() error {
	// 	return ps.DBX().GetContext(context.Background(), dest, query, args...)
	// }

	// ps.Log(func() {
	// 	err = exec()
	// }, query, args...)

	err = ps.DBX().GetContext(context.Background(), dest, query, args...)
	// clear no rows returned error
	if err == sql.ErrNoRows || err == nil {
		return nil
	}
	return
}

// Select is a helper function that will ignore sql.ErrNoRows
func (ps *postgresSession) Select(dest interface{}, query string, args ...interface{}) (err error) {
	// exec := func() error {
	// 	return ps.DBX().SelectContext(context.Background(), dest, query, args...)
	// }

	// ps.Log(func() {
	// 	err = exec()
	// }, query, args...)

	err = ps.DBX().SelectContext(context.Background(), dest, query, args...)
	// clear no rows returned error
	if err == sql.ErrNoRows || err == nil {
		return nil
	}
	return
}

func (ps *postgresSession) Exec(query string, args ...interface{}) (sql.Result, error) {
	return ps.DBX().Exec(query, args)
}
func (ps *postgresSession) Prepare(query string) (*sql.Stmt, error) {
	return ps.DBX().Prepare(query)
}
func (ps *postgresSession) Query(query string, args ...interface{}) (*sql.Rows, error) {
	return ps.DBX().Query(query, args)
}
func (ps *postgresSession) QueryRow(query string, args ...interface{}) *sql.Row {
	return ps.DBX().QueryRow(query, args)
}
func (ps *postgresSession) ExecContext(ctx context.Context, query string, args ...interface{}) (sql.Result, error) {
	return ps.DBX().ExecContext(ctx, query, args)
}
func (ps *postgresSession) PrepareContext(ctx context.Context, query string) (*sql.Stmt, error) {
	return ps.DBX().PrepareContext(ctx, query)
}
func (ps *postgresSession) QueryContext(ctx context.Context, query string, args ...interface{}) (*sql.Rows, error) {
	return ps.DBX().QueryContext(ctx, query, args)
}
func (ps *postgresSession) QueryRowContext(ctx context.Context, query string, args ...interface{}) *sql.Row {
	return ps.DBX().QueryRowContext(ctx, query, args)
}

// func (ps *postgresSession) Log(callback func(), query string, args ...interface{}) {
// 	start := time.Now()
// 	callback()
// 	duration := time.Since(start).Seconds()
// 	ps.logger.WithField("duration", duration).WithField("args", args).Debug(context.Background(), query)
// }

var _ db.Session = (*postgresSession)(nil)
