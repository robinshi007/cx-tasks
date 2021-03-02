package dbm

import (
	"context"
	"errors"
	"fmt"
	"path/filepath"
	"runtime"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	bindata "github.com/golang-migrate/migrate/v4/source/go_bindata"
	"github.com/google/wire"

	//_ "github.com/golang-migrate/migrate/v4/source/file"
	_ "github.com/golang-migrate/migrate/v4/source/pkger"
	_ "github.com/lib/pq"
	_ "github.com/mattn/go-sqlite3"

	"github.com/robinshi007/cx-tasks/infra/cfg"
	"github.com/robinshi007/cx-tasks/infra/db"
	"github.com/robinshi007/cx-tasks/infra/log"
	mpostgres "github.com/robinshi007/cx-tasks/internal/dbm/migrations/postgres"
	ucase "github.com/robinshi007/cx-tasks/internal/domain/usecase"
)

var RootDir string

func init() {
	_, dir, _, _ := runtime.Caller(0)
	RootDir = filepath.Dir(filepath.Dir(dir))
}

type Migration struct {
	// driverName string
	// mDir       string
	mInst *migrate.Migrate

	// config cfg.Config
	// dbs    db.Session
	logger log.Logger

	tuc ucase.TaskUsecase
}

func NewMigration(
	c cfg.Config,
	l log.Logger,
	d db.Session,
	tuc ucase.TaskUsecase,
) (*Migration, error) {
	var err error
	driverName := d.DriverName()
	migrationDir := fmt.Sprintf("%s/dbm/migrations/%s",
		RootDir, driverName)
	l.Debug(context.Background(), migrationDir)

	sqlDB := d.Driver()
	var mInst *migrate.Migrate
	var dInst database.Driver
	if driverName == "postgres" {
		dInst, err = postgres.WithInstance(sqlDB, &postgres.Config{})
	}
	if err != nil {
		return nil, err
	}
	s := bindata.Resource(mpostgres.AssetNames(),
		func(name string) ([]byte, error) {
			return mpostgres.Asset(name)
		})

	sInst, err := bindata.WithInstance(s)
	mInst, err = migrate.NewWithInstance("go-bindata", sInst, driverName, dInst)
	if err != nil {
		return nil, err
	}
	return &Migration{
		// driverName: driverName,
		// mDir:       migrationDir,
		// config: c,
		// dbs:    d,
		mInst:  mInst,
		logger: l,
		tuc:    tuc,
	}, nil
}

func (m *Migration) Up() error {
	var err error
	ctx := context.Background()

	if err = m.mInst.Up(); errors.Is(err, migrate.ErrNoChange) {
		m.logger.Info(ctx, "=> migrate up: %s", err)
	} else if err != nil {
		m.logger.Error(ctx, "=> migrate up: %s", err)
	} else {
		m.logger.Info(ctx, "=> migrate up: done")
	}
	return nil
}
func (m *Migration) Down() (err error) {
	ctx := context.Background()
	if err := m.mInst.Down(); errors.Is(err, migrate.ErrNoChange) {
		m.logger.Info(ctx, "=> migrate down: %s", err)
	} else if err != nil {
		m.logger.Error(ctx, "=> migrate down: %s", err)
	} else {
		m.logger.Info(ctx, "=> migrate down: done")
	}
	return
}

var MigrationProviderSet = wire.NewSet(NewMigration)
