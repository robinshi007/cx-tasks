package db

import (
	"context"
	"database/sql"
)

// SQLEngine represents a SQL engine that can execute SQL queries. This is
// compatible with *sql.DB.
type SQL interface {
	Select(dest interface{}, query string, args ...interface{}) error
	Get(dest interface{}, query string, args ...interface{}) error
	// Insert(table string, args map[string]interface{}) error
	// Update(table string, args map[string]interface{}, cond map[string]interface{}) error

	Exec(string, ...interface{}) (sql.Result, error)
	Prepare(string) (*sql.Stmt, error)
	Query(string, ...interface{}) (*sql.Rows, error)
	QueryRow(string, ...interface{}) *sql.Row

	ExecContext(context.Context, string, ...interface{}) (sql.Result, error)
	PrepareContext(context.Context, string) (*sql.Stmt, error)
	QueryContext(context.Context, string, ...interface{}) (*sql.Rows, error)
	QueryRowContext(context.Context, string, ...interface{}) *sql.Row
}
