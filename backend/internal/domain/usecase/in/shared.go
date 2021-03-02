package in

import (
	gv "github.com/asaskevich/govalidator"
)

// Validate -
func Validate(v interface{}) (err error) {
	_, err = gv.ValidateStruct(v)
	return
}
