package provider

import (
	"context"
	"database/sql"
	"fmt"
	"sync"
	"time"

	"github.com/gchaincl/sqlhooks"
	"github.com/google/wire"
	"github.com/jmoiron/sqlx"
	"github.com/lib/pq"

	"github.com/robinshi007/cx-tasks/infra/db"
	"github.com/robinshi007/cx-tasks/infra/db/bpostgres"
	"github.com/robinshi007/cx-tasks/infra/log"
)

const (
	// BeginTimeSQL - for log in sqlhooks
	BeginTimeSQL = iota
	SQLQuery
	SQLArgs
)

var once sync.Once

// DefaultDatabase is a constructor that will create a logger with some default values on top of provided ones
func NewDatabase(
	o *DbOptions,
	oa *AppOptions,
	l log.Logger,
) (db.Session, error) {
	var db *sqlx.DB
	var err error
	timeout := 15 * time.Second
	deadline := time.Now().Add(timeout)

	mode := oa.Mode
	// register database driver proxy to log sql expresion
	proxyName := fmt.Sprintf("%s-proxy", o.Code)
	once.Do(func() {
		switch o.Code {
		case "postgres":
			sql.Register(proxyName, sqlhooks.Wrap(&pq.Driver{}, &hook{
				Mode:   mode,
				Logger: l,
			}))
		default:
			sql.Register(proxyName, sqlhooks.Wrap(&pq.Driver{}, &hook{
				Mode:   mode,
				Logger: l,
			}))
		}
		l.Info(context.Background(), "SQL MODE: %s", mode)
	})

	// connect to database server in 5 seconds
	for {
		if time.Now().After(deadline) {
			return nil, fmt.Errorf("database did not start up in %s (%v)", timeout, err)
		}
		//db, err := sql.Open("postgres-proxy", o.DSN)
		db, err = sqlx.Open(proxyName, o.DSN)
		l.Debug(context.Background(), "sqlx is openning...")
		if err != nil {
			time.Sleep(timeout / 5)
			continue
		}
		err = db.Ping()
		if err == nil {
			break
		}
		time.Sleep(timeout / 5)
	}

	switch o.Code {
	case "postgres":
		return bpostgres.New(db, l), nil
	default:
		return bpostgres.New(db, l), nil
	}
}

// hook
type hook struct {
	Mode   string
	Logger log.Logger
}

// Before implements sqlhooks.Hooks
func (h *hook) Before(ctx context.Context, query string, args ...interface{}) (context.Context, error) {
	// Print sql logs only in dev mode
	if h.Mode == "dev" {
		beginTime := time.Now()
		ctx = context.WithValue(ctx, BeginTimeSQL, beginTime)
		ctx = context.WithValue(ctx, SQLQuery, query)
		ctx = context.WithValue(ctx, SQLArgs, args)
		return ctx, nil
	}
	return ctx, nil
}

// After implements sqlhooks.Hooks
func (h *hook) After(ctx context.Context, query string, args ...interface{}) (context.Context, error) {
	// Print sql logs only in dev mode
	if h.Mode == "dev" {
		begin := ctx.Value(BeginTimeSQL).(time.Time)
		query := ctx.Value(SQLQuery).(string)
		args := ctx.Value(SQLArgs)
		duration := time.Since(begin)

		h.Logger.WithField("duration", duration).WithField("args", args).Debug(ctx, query)
	}
	return ctx, nil
}

// After implements sqlhooks.OnError
func (h *hook) OnError(ctx context.Context, err error, query string, args ...interface{}) error {
	return nil
}

var DbProviderSet = wire.NewSet(NewDatabase)
