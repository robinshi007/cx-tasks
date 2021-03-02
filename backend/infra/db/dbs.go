package db

import (
	"database/sql"
	"time"

	"github.com/jmoiron/sqlx"
)

type Builder interface {
	SetDriverName(name string) Builder
	SetDSN(name string) Builder
	SetMode(mode string) Builder
	SetConnMaxIdleTime(d time.Duration) Builder
	SetConnMaxLifetime(d time.Duration) Builder
	SetMaxIdleConns(n int) Builder
	SetMaxOpenConns(n int) Builder
	Build() (Session, error)
}

// database contains:
// 1. sqldb(mysql, postgres, sqlite, sql server)
// 2. newsqldb(tidb, cockroachdb)
// 3. nosqldb[kv, tabular, document, graph](redis, hbase, mongodb, neo4j)

// type Adapter interface {
// 	Open(DSN string) (Session, error)
// }

type Session interface {
	// database name
	Name() string
	// return an error if DBMS could not be reached
	Ping() error
	// close the current active connection to the DBMS
	Close() error

	DriverName() string
	// e.g. session.Driver().(*sql.DB)
	Driver() *sql.DB
	// TODO: will remove later
	DBX() *sqlx.DB

	// Log(callback func(), query string, args ...interface{})
	SQL
}
