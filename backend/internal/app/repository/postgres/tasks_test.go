package postgres_test

import (
	"context"

	"github.com/stretchr/testify/suite"

	"github.com/robinshi007/cx-tasks/internal/dbm"
	"github.com/robinshi007/cx-tasks/internal/di"
	"github.com/robinshi007/cx-tasks/internal/domain/model"
)

type TaskRepoSuite struct {
	suite.Suite
	m *dbm.Migration
}

func (suite *TaskRepoSuite) SetupSuite() {
	suite.m, _ = di.InjectMigration("")
}
func (suite *TaskRepoSuite) SetupTest() {
	suite.m.Up()
}
func (suite *TaskRepoSuite) TearDownTest() {
	suite.m.Down()
}

func (suite *TaskRepoSuite) TestFindAll_0() {
	rp, _ := di.InjectTaskRepo("")
	ctx := context.Background()

	tasks, _ := rp.FindAll(ctx, model.DefaultListOptions())
	expectedCount := 0
	suite.Equal(expectedCount, len(tasks))
}
func (suite *TaskRepoSuite) TestCreate() {
	rp, _ := di.InjectTaskRepo("")
	ctx := context.Background()

	ctx = ProvideUser(ctx, "MyName")
	ctx = ProvideProject(ctx, "MyProject")
	ctx = ProvideSection(ctx, "MySection")
	userID, _ := ctx.Value(model.ContextKeyCurUserID).(int64)
	projectID, _ := ctx.Value(model.ContextKeyCurProjectID).(int64)
	sectionID, _ := ctx.Value(model.ContextKeyCurSectionID).(int64)

	expectedName := "MyTask"
	expectedDesc := "MyTaskDesc"
	newTask, _ := model.NewTask(ctx, expectedName, expectedDesc)
	taskID, _ := rp.Create(ctx, newTask)
	task, _ := rp.FindByID(ctx, taskID)
	suite.Equal(expectedName, task.Name)
	suite.Equal(expectedDesc, task.Description)
	suite.Equal(projectID, task.Project.ID)
	suite.Equal(sectionID, task.Section.ID)
	suite.Equal(userID, task.CreatedByID)
	suite.Equal(userID, task.Assignee.ID)
}

func (suite *TaskRepoSuite) TestCRUD() {
	rp, _ := di.InjectTaskRepo("")
	ctx := context.Background()

	ctx = ProvideUser(ctx, "MyName")
	ctx = ProvideProject(ctx, "MyProject")
	ctx = ProvideSection(ctx, "MySection")
	// userID, _ := ctx.Value(model.ContextKeyCurUserID).(int64)
	// projectID, _ := ctx.Value(model.ContextKeyCurProjectID).(int64)
	// sectionID, _ := ctx.Value(model.ContextKeyCurSectionID).(int64)

	expectedName := "MyTask"
	expectedDesc := "MyTaskDesc"
	newTask, _ := model.NewTask(ctx, expectedName, expectedDesc)
	taskID, _ := rp.Create(ctx, newTask)

	task, _ := rp.FindByID(ctx, taskID)
	suite.Equal(expectedName, task.Name)

	task2, _ := rp.FindByName(ctx, expectedName)
	suite.Equal(expectedName, task2.Name)

	tasks, _ := rp.FindAll(ctx, model.DefaultListOptions())
	expectedCount := 1
	suite.Equal(expectedCount, len(tasks))

	expectedName3 := "Hello world!"
	newTask3, _ := model.NewTaskForUpdate(ctx, taskID)
	newTask3.Name = expectedName3
	task3, _ := rp.Update(ctx, newTask3)
	suite.Equal(expectedName3, task3.Name)

	newTask4, _ := model.NewTask(ctx, "task name", "task desc")
	_, _ = rp.Create(ctx, newTask4)
	tasks, _ = rp.FindAll(ctx, model.DefaultListOptions())
	expectedCount = 2
	suite.Equal(expectedCount, len(tasks))

	taskDeleted, _ := model.NewTaskForDelete(ctx, taskID)
	_ = rp.Delete(ctx, taskDeleted)

	tasks, _ = rp.FindAll(ctx, model.DefaultListOptions())
	expectedCount = 1
	suite.Equal(expectedCount, len(tasks))
}

func (suite *TaskRepoSuite) TestRelation() {
}
