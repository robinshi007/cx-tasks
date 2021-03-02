package log

import (
	"context"
	"io"
	"strings"
)

type Level int8

const (
	// TraceLevel defines trace log level
	TraceLevel Level = iota
	// DebugLevel defines debug log level
	DebugLevel
	// InfoLevel defines info log level
	InfoLevel
	// WarnLevel defines warn log level
	WarnLevel
	// ErrorLevel defines error log level
	ErrorLevel
)

func (l Level) String() string {
	switch l {
	case ErrorLevel:
		return "error"
	case WarnLevel:
		return "warn"
	case InfoLevel:
		return "info"
	case DebugLevel:
		return "debug"
	default:
		return "trace"
	}
}

func ParseLevel(str string) Level {
	switch strings.ToLower(str) {
	case "error":
		return ErrorLevel
	case "warn":
		return WarnLevel
	case "info":
		return InfoLevel
	case "debug":
		return DebugLevel
	default:
		return TraceLevel
	}
}

// LoggerConfiguration get some of the logger configuation options and the implementation
type LoggerConfiguration interface {
	Level() Level
	Implementation() interface{}
}

// ContextExtrator is an alias for a function that extract values from context
type ContextExtractor func(ctx context.Context) map[string]interface{}

// Builder defines log configuation optioins
type Builder interface {
	// IncrementSkipFrames peels an additional layer to show the actual log line position
	IncrementSkipFrames(addition int) Builder
	// SetLevel() set system log level
	SetLevel(level Level) Builder

	SetWriter(writer io.Writer) Builder
	// AddStaticFields will always add provided fields to every log entry
	AddStaticFields(fields map[string]interface{}) Builder
	// ExcludeTime configures zerolog to exclude any time field
	ExcludeTime() Builder
	// SetCustomTimeFormatter sets the time format field, have no effect if ExcludeTime is called
	SetCustomTimeFormatter(format string) Builder
	// IncludeCaller adds caller:line to log entry
	IncludeCaller() Builder

	// Build() returns a Logger implementation
	Build() Logger
}

// Messages part of the Logger interface
type Messages interface {
	// Trace - ctx can be nil
	Trace(ctx context.Context, format string, args ...interface{})
	Debug(ctx context.Context, format string, args ...interface{})
	Info(ctx context.Context, format string, args ...interface{})
	Warn(ctx context.Context, format string, args ...interface{})
	Error(ctx context.Context, format string, args ...interface{})
	Custom(ctx context.Context, level Level, skipAdditionalFrames int, format string, args ...interface{})
}

// Fields part of the Logger interface
type Fields interface {
	Messages
	// WithError - add an error to the log structure
	WithError(err error) Fields
	// WithField - add informative field to the log structure
	WithField(name string, value interface{}) Fields
}

// Logger is a simple interface that defines logging in the system
type Logger interface {
	Fields
	// Implementation returns the actual lib/struct that is responsible for the above logic
	Configuration() LoggerConfiguration
}
