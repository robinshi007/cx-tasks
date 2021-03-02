package rest_test

import (
	"testing"

	"github.com/stretchr/testify/suite"
)

func TestSuite(t *testing.T) {
	// This is what actually runs our suite
	suite.Run(t, new(TaskHandlerSuite))
}
