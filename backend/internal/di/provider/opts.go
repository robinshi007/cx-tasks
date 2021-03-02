package provider

import (
	"context"
	"fmt"
	"time"

	"github.com/google/wire"

	"github.com/robinshi007/cx-tasks/infra/cfg"
	"github.com/robinshi007/cx-tasks/infra/log"
	"github.com/robinshi007/cx-tasks/internal/pkg/build"
)

type AppOptions struct {
	Name string
	Mode string
}

func NewAppOptions(c cfg.Config) (*AppOptions, error) {
	nameValue := c.Get("app.name")
	if !nameValue.IsSet() {
		return nil, fmt.Errorf("unmarshal app option error: app name not set")
	}
	modeValue := c.Get("app.mode")
	if !modeValue.IsSet() {
		return nil, fmt.Errorf("unmarshal app option error: app name not set")
	}
	return &AppOptions{
		Name: nameValue.String(),
		Mode: modeValue.String(),
	}, nil
}

type LogOptions struct {
	Code    string
	Level   string
	Console bool
	Static  struct {
		AppName         bool `mapstructure:"app"`
		GitCommit       bool `mapstructure:"git"`
		HostName        bool `mapstructure:"host"`
		AppNameString   string
		GitCommitString string
		HostNameString  string
	} `mapstructure:"static"`
}

func NewLogOptions(c cfg.Config, ao *AppOptions) (*LogOptions, error) {
	var err error
	o := new(LogOptions)
	if err = c.MapKey("app.logger", o); err != nil {
		return nil, fmt.Errorf("unmarshal logger option error:%w", err)
	}
	//fmt.Println("log config: ", o)
	info := build.GetInformation()
	o.Static.AppNameString = ao.Name
	o.Static.GitCommitString = info.GitCommit
	o.Static.HostNameString = info.Hostname
	return o, nil
}

type DbOptions struct {
	Code string
	DSN  string

	// below options will implement later
	ConnMaxIdleTime time.Duration
	ConnMaxLifetime time.Duration
	MaxIdleConns    int
	MaxOpenConns    int
}

func NewDbOptions(c cfg.Config, l log.Logger) (*DbOptions, error) {
	var err error
	o := new(DbOptions)
	if err = c.MapKey("app.database", o); err != nil {
		return nil, fmt.Errorf("unmarshal database option error:%w", err)
	}
	//fmt.Println("db config: ", o)
	l.Debug(context.Background(), "config: %v", c.Map())
	return o, nil
}

type ServerOptions struct {
	Rest struct {
		Port int
	} `mapstructure:"rest"`
	RPC struct {
		Port int
	} `mapstructure:"rpc"`
}

func NewServerOptions(c cfg.Config) (*ServerOptions, error) {
	var err error
	o := new(ServerOptions)
	if err = c.MapKey("app.server", o); err != nil {
		return nil, fmt.Errorf("unmarshal server option error:%w", err)
	}
	//fmt.Println("server config: ", o)
	return o, nil
}

var OptsProviderSet = wire.NewSet(NewAppOptions, NewLogOptions, NewDbOptions, NewServerOptions)
