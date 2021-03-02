package provider

import (
	"github.com/google/wire"
	"github.com/robinshi007/cx-tasks/infra/srz"
	"github.com/robinshi007/cx-tasks/infra/srz/bjson"
)

func NewSerializer() (srz.Serializer, error) {
	return &bjson.JSONSerializer{}, nil
}

var SrzProviderSet = wire.NewSet(NewSerializer)
