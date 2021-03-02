package postgres_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/suite"

	"github.com/robinshi007/cx-tasks/internal/di"
	"github.com/robinshi007/cx-tasks/internal/domain/model"
)

func TestSuite(t *testing.T) {
	// This is what actually runs our suite
	suite.Run(t, new(UserRepoSuite))
	suite.Run(t, new(ProjectRepoSuite))
	suite.Run(t, new(SectionRepoSuite))
	suite.Run(t, new(TaskRepoSuite))
}

func ProvideUser(ctx context.Context, name string) context.Context {
	userRepo, _ := di.InjectUserRepo("")
	newUser, _ := model.NewUser(ctx, name, name+"@test.io", name+"Pass")
	userID, _ := userRepo.Create(ctx, newUser)
	ctx = context.WithValue(ctx, model.ContextKeyCurUserID, userID)
	return ctx
}
func ProvideProject(ctx context.Context, name string) context.Context {
	//userID, _:= ctx.Value(ContextKeyCurUserID).(int64)
	projectRepo, _ := di.InjectProjectRepo("")
	newProject, _ := model.NewProject(ctx, name, name+" desc")
	projectID, _ := projectRepo.Create(ctx, newProject)
	ctx = context.WithValue(ctx, model.ContextKeyCurProjectID, projectID)
	return ctx
}
func ProvideSection(ctx context.Context, name string) context.Context {
	sectionRepo, _ := di.InjectSectionRepo("")
	newSection, _ := model.NewSection(ctx, name, name+" desc")
	sectionID, _ := sectionRepo.Create(ctx, newSection)
	ctx = context.WithValue(ctx, model.ContextKeyCurSectionID, sectionID)
	return ctx
}
