package util

// Ported from Goji's middleware, source:
// https://github.com/zenazn/goji/tree/master/web/middleware

import (
	"fmt"
	"io"
	"os"
)

var (
	// Normal colors
	NBlack   = []byte{'\033', '[', '3', '0', 'm'}
	NRed     = []byte{'\033', '[', '3', '1', 'm'}
	NGreen   = []byte{'\033', '[', '3', '2', 'm'}
	NYellow  = []byte{'\033', '[', '3', '3', 'm'}
	NBlue    = []byte{'\033', '[', '3', '4', 'm'}
	NMagenta = []byte{'\033', '[', '3', '5', 'm'}
	NCyan    = []byte{'\033', '[', '3', '6', 'm'}
	NWhite   = []byte{'\033', '[', '3', '7', 'm'}
	// Bright colors
	BBlack   = []byte{'\033', '[', '3', '0', ';', '1', 'm'}
	BRed     = []byte{'\033', '[', '3', '1', ';', '1', 'm'}
	BGreen   = []byte{'\033', '[', '3', '2', ';', '1', 'm'}
	BYellow  = []byte{'\033', '[', '3', '3', ';', '1', 'm'}
	BBlue    = []byte{'\033', '[', '3', '4', ';', '1', 'm'}
	BMagenta = []byte{'\033', '[', '3', '5', ';', '1', 'm'}
	BCyan    = []byte{'\033', '[', '3', '6', ';', '1', 'm'}
	BWhite   = []byte{'\033', '[', '3', '7', ';', '1', 'm'}

	Reset = []byte{'\033', '[', '0', 'm'}
)

var isTTY bool

func init() {
	// This is sort of cheating: if stdout is a character device, we assume
	// that means it's a TTY. Unfortunately, there are many non-TTY
	// character devices, but fortunately stdout is rarely set to any of
	// them.
	//
	// We could solve this properly by pulling in a dependency on
	// code.google.com/p/go.crypto/ssh/terminal, for instance, but as a
	// heuristic for whether to print in color or in black-and-white, I'd
	// really rather not.
	fi, err := os.Stdout.Stat()
	if err == nil {
		m := os.ModeDevice | os.ModeCharDevice
		isTTY = fi.Mode()&m == m
	}
}

// CW - colorWrite
func CW(w io.Writer, color []byte, s string, args ...interface{}) {
	if isTTY {
		w.Write(color)
	}
	fmt.Fprintf(w, s, args...)
	if isTTY {
		w.Write(Reset)
	}
}
