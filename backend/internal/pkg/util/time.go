package util

import (
	"time"
)

const (
	// TimeFormatStr -
	TimeFormatStr = "2006-01-02 15:04:05"
)

func TimeNow() time.Time {
	return time.Now()
}
