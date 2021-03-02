package postgres_test

import (
	"context"

	"github.com/stretchr/testify/suite"

	"github.com/robinshi007/cx-tasks/internal/dbm"
	"github.com/robinshi007/cx-tasks/internal/di"
	"github.com/robinshi007/cx-tasks/internal/domain/model"
)

type SectionRepoSuite struct {
	suite.Suite
	m *dbm.Migration
}

func (suite *SectionRepoSuite) SetupSuite() {
	suite.m, _ = di.InjectMigration("")
}
func (suite *SectionRepoSuite) SetupTest() {
	suite.m.Up()
}
func (suite *SectionRepoSuite) TearDownTest() {
	suite.m.Down()
}

func (suite *SectionRepoSuite) TestFindAll_0() {
	rp, _ := di.InjectSectionRepo("")
	ctx := context.Background()

	sections, _ := rp.FindAll(ctx, model.DefaultListOptions())
	expectedCount := 0
	suite.Equal(expectedCount, len(sections))
}
func (suite *SectionRepoSuite) TestCreate() {
	ctx := context.Background()
	rp, _ := di.InjectSectionRepo("")

	expectedName := "MySection"
	ctx = ProvideUser(ctx, "MyName")
	ctx = ProvideProject(ctx, "MyProject")
	ctx = ProvideSection(ctx, expectedName)
	userID, _ := ctx.Value(model.ContextKeyCurUserID).(int64)
	projectID, _ := ctx.Value(model.ContextKeyCurProjectID).(int64)
	sectionID, _ := ctx.Value(model.ContextKeyCurSectionID).(int64)

	section, _ := rp.FindByID(ctx, sectionID)
	suite.Equal(expectedName, section.Name)
	suite.Equal(projectID, section.Project.ID)
	suite.Equal(userID, section.CreatedBy.ID)
	suite.Equal(userID, section.UpdatedBy.ID)
}

func (suite *SectionRepoSuite) TestCRUD() {
	ctx := context.Background()
	rp, _ := di.InjectSectionRepo("")

	expectedName := "MySection"
	ctx = ProvideUser(ctx, "MyName")
	ctx = ProvideProject(ctx, "MyProject")
	ctx = ProvideSection(ctx, expectedName)
	sectionID, _ := ctx.Value(model.ContextKeyCurSectionID).(int64)

	section, _ := rp.FindByID(ctx, sectionID)
	suite.Equal(expectedName, section.Name)

	section2, _ := rp.FindByName(ctx, expectedName)
	suite.Equal(expectedName, section2.Name)

	sections, _ := rp.FindAll(ctx, model.DefaultListOptions())
	expectedCount := 1
	suite.Equal(expectedCount, len(sections))

	expectedName3 := "Hello world!"
	newSection3, _ := model.NewSectionForUpdate(ctx, sectionID)
	newSection3.Name = expectedName3
	section3, _ := rp.Update(ctx, newSection3)
	suite.Equal(expectedName3, section3.Name)

	ctx = ProvideSection(ctx, "Section Again")

	sections, _ = rp.FindAll(ctx, model.DefaultListOptions())
	expectedCount = 2
	suite.Equal(expectedCount, len(sections))

	sectionForDelete, _ := model.NewSectionForDelete(ctx, sectionID)
	_ = rp.Delete(ctx, sectionForDelete)
	sections, _ = rp.FindAll(ctx, model.DefaultListOptions())
	expectedCount = 1
	suite.Equal(expectedCount, len(sections))
}

func (suite *SectionRepoSuite) TestRelation() {
	ctx := context.Background()
	//rp, _ := di.InjectSectionRepo("")
	projectRepo, _ := di.InjectProjectRepo("")

	expectedName := "MySection"
	ctx = ProvideUser(ctx, "MyName")
	ctx = ProvideProject(ctx, "MyProject")
	ctx = ProvideSection(ctx, expectedName)
	projectID, _ := ctx.Value(model.ContextKeyCurProjectID).(int64)

	project, _ := projectRepo.FindByID(ctx, projectID)
	suite.Equal(1, len(project.Sections))
}
