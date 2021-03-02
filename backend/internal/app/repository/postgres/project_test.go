package postgres_test

import (
	"context"

	"github.com/stretchr/testify/suite"

	"github.com/robinshi007/cx-tasks/internal/dbm"
	"github.com/robinshi007/cx-tasks/internal/di"
	"github.com/robinshi007/cx-tasks/internal/domain/model"
)

type ProjectRepoSuite struct {
	suite.Suite
	m *dbm.Migration
}

func (suite *ProjectRepoSuite) SetupSuite() {
	suite.m, _ = di.InjectMigration("")
}
func (suite *ProjectRepoSuite) SetupTest() {
	suite.m.Up()
}
func (suite *ProjectRepoSuite) TearDownTest() {
	suite.m.Down()
}

func (suite *ProjectRepoSuite) TestFindAll_0() {
	rp, _ := di.InjectProjectRepo("")
	ctx := context.Background()

	projects, _ := rp.FindAll(ctx, model.DefaultListOptions())
	expectedCount := 0
	suite.Equal(expectedCount, len(projects))
}
func (suite *ProjectRepoSuite) TestCreate() {
	ctx := context.Background()
	rp, _ := di.InjectProjectRepo("")

	expectedName := "MyProject"
	ctx = ProvideUser(ctx, "MyName")
	ctx = ProvideProject(ctx, expectedName)
	userID, _ := ctx.Value(model.ContextKeyCurUserID).(int64)
	projectID, _ := ctx.Value(model.ContextKeyCurProjectID).(int64)

	project, _ := rp.FindByID(ctx, projectID)
	suite.Equal(expectedName, project.Name)
	suite.Equal(userID, project.Owner.ID)
	suite.Equal(userID, project.CreatedBy.ID)
	suite.Equal(userID, project.UpdatedBy.ID)
	suite.Equal("MyName", project.UpdatedBy.UserName)
}

func (suite *ProjectRepoSuite) TestCRUD() {
	ctx := context.Background()
	rp, _ := di.InjectProjectRepo("")

	expectedName := "MyProject"
	ctx = ProvideUser(ctx, "MyName")
	ctx = ProvideProject(ctx, expectedName)
	projectID, _ := ctx.Value(model.ContextKeyCurProjectID).(int64)
	project, _ := rp.FindByID(ctx, projectID)

	suite.Equal(expectedName, project.Name)

	project2, _ := rp.FindByName(ctx, expectedName)
	suite.Equal(expectedName, project2.Name)

	projects, _ := rp.FindAll(ctx, model.DefaultListOptions())
	expectedCount := 1
	suite.Equal(expectedCount, len(projects))

	// change user
	userNameChanged := "MyNameChanged"
	ctx = ProvideUser(ctx, userNameChanged)
	expectedName3 := "Hello world!"
	newProject3, _ := model.NewProjectForUpdate(ctx, projectID)
	newProject3.Name = expectedName3
	_, _ = rp.Update(ctx, newProject3)
	project4, _ := rp.FindByID(ctx, projectID)
	suite.Equal(expectedName3, project4.Name)
	suite.Equal(userNameChanged, project4.UpdatedBy.UserName)

	ctx = ProvideProject(ctx, "New Project")
	projects, _ = rp.FindAll(ctx, model.DefaultListOptions())
	expectedCount = 2
	suite.Equal(expectedCount, len(projects))

	projectForDelete, _ := model.NewProjectForDelete(ctx, projectID)
	_ = rp.Delete(ctx, projectForDelete)
	projects, _ = rp.FindAll(ctx, model.DefaultListOptions())
	expectedCount = 1
	suite.Equal(expectedCount, len(projects))
}

func (suite *ProjectRepoSuite) TestRelation() {
	ctx := context.Background()
	rp, _ := di.InjectProjectRepo("")
	userRepo, _ := di.InjectUserRepo("")

	expectedName := "MyProject"
	ctx = ProvideUser(ctx, "MyName")
	ctx = ProvideProject(ctx, expectedName)
	userID, _ := ctx.Value(model.ContextKeyCurUserID).(int64)
	user, _ := userRepo.FindByID(ctx, userID)
	projectID, _ := ctx.Value(model.ContextKeyCurProjectID).(int64)
	project, _ := rp.FindByID(ctx, projectID)
	suite.Equal("MyName", project.Owner.UserName)
	suite.Equal(1, len(user.OwnedProjects))

	ctx = ProvideProject(ctx, "MyProject2")
	user2, _ := userRepo.FindByID(ctx, userID)
	suite.Equal(2, len(user2.OwnedProjects))

	projectForDelete, _ := model.NewProjectForDelete(ctx, projectID)
	_ = rp.Delete(ctx, projectForDelete)
	user3, _ := userRepo.FindByID(ctx, userID)
	suite.Equal(1, len(user3.OwnedProjects))
}
