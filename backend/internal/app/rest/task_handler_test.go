package rest_test

// https://github.com/gavv/httpexpect/blob/master/_examples/fruits_test.go

import (
	"net/http"
	"net/http/httptest"

	"github.com/gavv/httpexpect"
	"github.com/stretchr/testify/suite"

	"github.com/robinshi007/cx-tasks/internal/app/rest"
	"github.com/robinshi007/cx-tasks/internal/dbm"
	"github.com/robinshi007/cx-tasks/internal/di"
)

type TaskHandlerSuite struct {
	suite.Suite
	m *dbm.Migration
}

func (suite *TaskHandlerSuite) SetupSuite() {
	suite.m, _ = di.InjectMigration("")
}
func (suite *TaskHandlerSuite) SetupTest() {
	suite.m.Up()
}
func (suite *TaskHandlerSuite) TearDownTest() {
	suite.m.Down()
}

func (suite *TaskHandlerSuite) TestCRUD() {
	taskHandler, _ := di.InjectTaskHandler("")
	server := httptest.NewServer(rest.NewTaskRouter(taskHandler))
	defer server.Close()

	e := httpexpect.New(suite.T(), server.URL)

	e.GET("/").
		Expect().
		Status(http.StatusOK).JSON().Object().Value("data").Array().Length().Equal(0)

	task1 := map[string]interface{}{
		"name": "Bob",
	}
	task2 := map[string]interface{}{
		"name": "Alice",
	}
	task3 := map[string]interface{}{
		"name": "Ben",
	}

	e.POST("/").WithJSON(task1).
		Expect().
		Status(http.StatusOK)
	e.POST("/").WithJSON(task2).
		Expect().
		Status(http.StatusOK)

	e.GET("/").
		Expect().
		Status(http.StatusOK).JSON().Object().Value("data").Array().Length().Equal(2)

	e.GET("/1").
		Expect().
		Status(http.StatusOK).JSON().Object().Value("data").Object().ContainsKey("name").ValueEqual("name", "Bob")

	e.PUT("/1").WithJSON(task3).
		Expect().
		Status(http.StatusOK)

	e.GET("/1").
		Expect().
		Status(http.StatusOK).JSON().Object().Value("data").Object().ContainsKey("name").ValueEqual("name", "Ben")
	e.GET("/Ben/by_name").
		Expect().
		Status(http.StatusOK).JSON().Object().Value("data").Object().ContainsKey("id").ValueEqual("id", 1)

	e.DELETE("/2").
		Expect().
		Status(http.StatusOK)

	e.GET("/").
		Expect().
		Status(http.StatusOK).JSON().Object().Value("data").Array().Length().Equal(1)
}

func (suite *TaskHandlerSuite) TestError() {
	taskHandler, _ := di.InjectTaskHandler("")
	server := httptest.NewServer(rest.NewTaskRouter(taskHandler))
	defer server.Close()

	e := httpexpect.New(suite.T(), server.URL)

	task1 := map[string]interface{}{
		"name": "",
	}
	task2 := map[string]interface{}{
		"age": "12",
	}
	task3 := map[string]interface{}{
		"name": "Bob",
	}
	e.GET("/a1").
		Expect().Status(http.StatusNotFound)
	e.GET("/11").
		Expect().Status(http.StatusNotFound)

	e.POST("/").WithJSON(task1).
		Expect().Status(http.StatusBadRequest)
	e.POST("/").WithJSON(task2).
		Expect().Status(http.StatusBadRequest)
	e.POST("/").WithJSON(task3).
		Expect().Status(http.StatusOK)
	e.POST("/").WithJSON(task3).
		Expect().Status(http.StatusOK)

	e.PUT("/1").WithJSON(task2).
		Expect().Status(http.StatusBadRequest)
	e.PUT("/1").WithJSON(task3).
		Expect().Status(http.StatusNotModified)
	e.PUT("/a9").WithJSON(task3).
		Expect().Status(http.StatusNotFound)
	e.PUT("/99").WithJSON(task3).
		Expect().Status(http.StatusNotFound)

	e.DELETE("/a").
		Expect().Status(http.StatusNotFound)
	e.DELETE("/11").
		Expect().Status(http.StatusNotFound)

	e.GET("/").
		Expect().
		Status(http.StatusOK).JSON().Object().Value("data").Array().Length().Equal(2)
}
