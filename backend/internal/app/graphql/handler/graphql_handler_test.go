package handler_test

import (
	"net/http"
	"net/http/httptest"
	"testing"

	gqlhandler "github.com/99designs/gqlgen/handler"
	"github.com/gavv/httpexpect"
	"github.com/stretchr/testify/suite"

	"github.com/robinshi007/cx-tasks/internal/dbm"
	"github.com/robinshi007/cx-tasks/internal/di"
)

func TestSuite(t *testing.T) {
	suite.Run(t, new(GraphQLHandlerSuite))
}

type GraphQLHandlerSuite struct {
	suite.Suite
	m *dbm.Migration
}

func (st *GraphQLHandlerSuite) SetupSuite() {
	st.m, _ = di.InjectMigration("")
}
func (st *GraphQLHandlerSuite) SetupTest() {
	st.m.Up()
}
func (st *GraphQLHandlerSuite) TearDownTest() {
	st.m.Down()
}
func (st *GraphQLHandlerSuite) TestCRUD() {
	graphqlSchema, _ := di.InjectGraphqlSchema("")
	server := httptest.NewServer(gqlhandler.GraphQL(graphqlSchema))
	defer server.Close()

	e := httpexpect.New(st.T(), server.URL)

	queryList := map[string]interface{}{
		"operationName": nil,
		"variables":     map[string]interface{}{},
		"query": `{
			tasks {
				id
				title
			}
		}
	`,
	}
	e.POST("/").WithJSON(queryList).
		Expect().
		Status(http.StatusOK).JSON().Object().Value("data").
		Object().Value("tasks").Array().Length().Equal(0)

	mutationCreate := map[string]interface{}{
		"operationName": nil,
		"variables":     map[string]interface{}{},
		"query": `mutation {
			createTask(input: {
			title: "Task01"
			}) {
				id
				title
			}
		}
	`,
	}
	e.POST("/").WithJSON(mutationCreate).
		Expect().
		Status(http.StatusOK).JSON().Object().Value("data").
		Object().Value("createTask").Object().ContainsKey("title").ValueEqual("title", "Task01")

	e.POST("/").WithJSON(queryList).
		Expect().
		Status(http.StatusOK).JSON().Object().Value("data").
		Object().Value("tasks").Array().Length().Equal(1)

	queryItem := map[string]interface{}{
		"operationName": nil,
		"variables":     map[string]interface{}{},
		"query": `{
			fetchTask(input: {
				id: "1"
			}){
				id
				title
			}
		}
	`,
	}
	e.POST("/").WithJSON(queryItem).
		Expect().
		Status(http.StatusOK).JSON().Object().Value("data").
		Object().Value("fetchTask").Object().ValueEqual("title", "Task01")

	mutationUpdate := map[string]interface{}{
		"operationName": nil,
		"variables":     map[string]interface{}{},
		"query": `mutation {
			updateTask(input: {
			id: "1",
			title: "Task02"
			}) {
				id
				title
			}
		}
	`,
	}
	e.POST("/").WithJSON(mutationUpdate).
		Expect().
		Status(http.StatusOK).JSON().Object().Value("data").
		Object().Value("updateTask").Object().ValueEqual("title", "Task02")

	mutationDelete := map[string]interface{}{
		"operationName": nil,
		"variables":     map[string]interface{}{},
		"query": `mutation {
			deleteTask(input: {
				id: "1"
			}) {
				id
				title
			}
		}
	`,
	}
	e.POST("/").WithJSON(mutationDelete).
		Expect().
		Status(http.StatusOK).JSON().Object().Value("data").
		Object().Value("deleteTask").Object().ValueEqual("title", "Task02")

	e.POST("/").WithJSON(queryList).
		Expect().
		Status(http.StatusOK).JSON().Object().Value("data").
		Object().Value("tasks").Array().Length().Equal(0)
}
