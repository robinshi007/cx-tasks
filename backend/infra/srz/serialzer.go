package srz

import "io"

// Serializer -
type Serializer interface {
	Encode(input interface{}) ([]byte, error)
	Decode(input []byte, v interface{}) error
	DecodeFromReader(input io.Reader, v interface{}) error
}
