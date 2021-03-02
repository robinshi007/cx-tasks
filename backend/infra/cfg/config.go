package cfg

import "time"

type Value interface {
	// tell if this key really exists
	IsSet() bool
	// Raw returns an interface{}
	Raw() interface{}
	// Bool returns the value associated with the key as a boolean
	Bool() bool
	Int() int
	Int32() int32
	Int64() int64
	Uint() uint
	Uint32() uint32
	Uint64() uint64
	Float64() float64
	Time() time.Time
	Duration() time.Duration
	String() string
	IntSlice() []int
	StringSlice() []string
	StringMap() map[string]interface{}
	StringMapString() map[string]string
	StringMapStringSlice() map[string][]string

	// Unmarshal tries to unmarshal it to a 'result', 'result' field must be a pointer
	Unmarshal(result interface{}) error
}

type Config interface {
	// Get returns a Value associated with the given key
	// e.g.  numbers := config.Get("path.to.key").Int()
	// e.g. if value := config.Get("path.to.key"); value.IsSet() {
	//      }
	Get(key string) Value
	Set(key string, value interface{})
	// Map the entire configuration to a map
	Map() map[string]interface{}
	MapKey(key string, rawValue interface{}) error
	// Implementation returns the actual lib/struct that is responsible for the logic
	Implementation() interface{}
}

type Builder interface {
	// SetConfigFile tells builder where to look the file for the configuration
	SetConfigFile(path string) Builder
	// SetExtraConfigFile allows to add extra files to be merged into the config,
	// it's usefull for dev/test settings to override the default values
	AddExtraConfigFile(path string) Builder
	Build() (Config, error)
}
