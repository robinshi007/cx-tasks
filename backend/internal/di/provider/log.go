package provider

import (
	"errors"
	"os"

	"github.com/google/wire"

	"github.com/robinshi007/cx-tasks/infra/log"
	"github.com/robinshi007/cx-tasks/infra/log/bzerolog"
)

const (
	application = "app"
	hostname    = "host"
	gitCommit   = "git"
)
const compensateDefaultLogger = 0

// NewLogger is a constructor that will create a logger with some default values on top of provided ones
func NewLogger(
	o *LogOptions,
	loggerBuilder log.Builder,
) log.Logger {
	var logLevel = log.InfoLevel
	logLevel = log.ParseLevel(o.Level)
	builder := loggerBuilder.SetLevel(logLevel).IncrementSkipFrames(compensateDefaultLogger).
		AddStaticFields(NewStaticFieldsContextExtractor(o))
	if o.Console {
		builder = builder.SetWriter(bzerolog.ConsoleWriter(os.Stderr))
	}
	logger := builder.Build()
	return logger
}

func NewStaticFieldsContextExtractor(o *LogOptions) map[string]interface{} {
	output := make(map[string]interface{})
	appName := o.Static.AppNameString
	gitCommit := o.Static.AppNameString
	hostName := o.Static.HostNameString
	if len(appName) > 0 && o.Static.AppName {
		output[application] = appName
	}
	if len(hostName) > 0 && o.Static.HostName {
		output[hostname] = hostName
	}
	if len(gitCommit) > 0 && o.Static.GitCommit {
		output[gitCommit] = gitCommit
	}
	return output
}

func NewLogBuilder(
	o *LogOptions,
) log.Builder {
	if o.Code != "" {
		switch o.Code {
		case "zerolog":
			return bzerolog.Builder()
		default:
			return bzerolog.Builder()
		}
	}
	panic(errors.New("No logger builder provided"))
}

var LogProviderSet = wire.NewSet(NewLogBuilder, NewLogger)
