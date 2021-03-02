package postgres_test

import (
	"context"

	"github.com/stretchr/testify/suite"

	"github.com/robinshi007/cx-tasks/internal/dbm"
	"github.com/robinshi007/cx-tasks/internal/di"
	"github.com/robinshi007/cx-tasks/internal/domain/model"
)

type UserRepoSuite struct {
	suite.Suite
	m *dbm.Migration
}

func (suite *UserRepoSuite) SetupSuite() {
	suite.m, _ = di.InjectMigration("")
}
func (suite *UserRepoSuite) SetupTest() {
	suite.m.Up()
}
func (suite *UserRepoSuite) TearDownTest() {
	suite.m.Down()
}

func (suite *UserRepoSuite) TestFindAll_0() {
	rp, _ := di.InjectUserRepo("")
	ctx := context.Background()

	users, _ := rp.FindAll(ctx, model.DefaultListOptions())
	expectedCount := 0
	suite.Equal(expectedCount, len(users))
}
func (suite *UserRepoSuite) TestCreate() {
	rp, _ := di.InjectUserRepo("")
	ctx := context.Background()

	expectedName := "test"
	ctx = ProvideUser(ctx, expectedName)
	userID, _ := ctx.Value(model.ContextKeyCurUserID).(int64)
	user, _ := rp.FindByID(ctx, userID)
	suite.Equal(expectedName, user.UserName)
	suite.Equal(expectedName+"@test.io", user.Email)
	suite.Equal(expectedName+"Pass", user.Password)
}

func (suite *UserRepoSuite) TestCRUD() {
	rp, _ := di.InjectUserRepo("")
	ctx := context.Background()

	expectedName := "test"
	ctx = ProvideUser(ctx, expectedName)
	userID, _ := ctx.Value(model.ContextKeyCurUserID).(int64)
	user, _ := rp.FindByID(ctx, userID)
	suite.Equal(expectedName, user.UserName)

	user2, _ := rp.FindByName(ctx, expectedName)
	suite.Equal(expectedName, user2.UserName)

	users, _ := rp.FindAll(ctx, model.DefaultListOptions())
	expectedCount := 1
	suite.Equal(expectedCount, len(users))

	ctx = ProvideUser(ctx, "hello")
	users, _ = rp.FindAll(ctx, model.DefaultListOptions())
	expectedCount = 2
	suite.Equal(expectedCount, len(users))

	newUser4, _ := model.NewUserForDelete(ctx, userID)
	_ = rp.Delete(ctx, newUser4)
	users, _ = rp.FindAll(ctx, model.DefaultListOptions())
	expectedCount = 1
	suite.Equal(expectedCount, len(users))
}
