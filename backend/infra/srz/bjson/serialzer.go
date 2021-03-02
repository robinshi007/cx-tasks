package bjson

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
)

// JSON -
type JSONSerializer struct{}

// Decode -
func (r *JSONSerializer) Decode(input []byte, v interface{}) error {
	if err := json.Unmarshal(input, v); err != nil {
		return fmt.Errorf("serializer.JSON.Decode: %w", err)
	}
	return nil
}

// Encode -
func (r *JSONSerializer) Encode(input interface{}) ([]byte, error) {
	rawMsg, err := json.Marshal(input)
	if err != nil {
		return nil, fmt.Errorf("serializer.JSON.Encode: %w", err)
	}
	return rawMsg, nil
}

// Decode -
func (r *JSONSerializer) DecodeFromReader(input io.Reader, v interface{}) error {
	// convert io.Reader to []byte
	buf := new(bytes.Buffer)
	buf.ReadFrom(input)
	return r.Decode(buf.Bytes(), v)
}
