package provider

import (
	"fmt"
	"os"
	"path/filepath"
  "path"
	"runtime"

	"github.com/google/wire"

	"github.com/robinshi007/cx-tasks/infra/cfg"
	"github.com/robinshi007/cx-tasks/infra/cfg/bviper"
)

var RootDir string

func init() {
	_, dir, _, _ := runtime.Caller(0)
	RootDir = filepath.Dir(filepath.Dir(filepath.Dir(filepath.Dir(dir))))
}

func NewConfig(cp string) cfg.Config {
	var configPath string
	appMode := os.Getenv("APP_MODE")
	if appMode == "" {
		// set to dev mode by default
		appMode = "dev"
	}
	if cp == "" {
		cp = RootDir
	}
	configPath = path.Join(cp, fmt.Sprintf("conf/config.%s.yml", appMode))
	fmt.Println("configPath", configPath)

	builder := bviper.Builder().SetConfigFile(configPath)
	// for _, extraFile := range additionalFilePaths {
	// 	builder = builder.AddExtraConfigFile(extraFile)
	// }
	b, err := builder.Build()
	if err != nil {
		panic(err)
	}
	return b
}

var CfgProviderSet = wire.NewSet(NewConfig)
