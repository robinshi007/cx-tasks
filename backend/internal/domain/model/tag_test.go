package model_test

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"

	"github.com/robinshi007/cx-tasks/internal/domain/model"
)

func TestNewTagWithProjectScope(t *testing.T) {
	user := ProvideUser()
	ctx := context.WithValue(context.Background(), model.ContextKeyCurUserID, user.ID)
	project := ProvideProject(ctx)
	ctx = context.WithValue(ctx, model.ContextKeyCurProjectID, project.ID)
	tag, _ := model.NewTag(ctx, "test", "testDesc")
	assert.Equal(t, tag.Title, "test", "title should be equal")
	assert.Equal(t, tag.Description, "testDesc", "description should be equal")
	assert.Equal(t, tag.ScopeType, "project", "scope_type should be equal 'project'")
	assert.Equal(t, tag.ScopeID, project.ID, "scope_id should be equal project.id")
}

func TestNewTagWithMeScope(t *testing.T) {
	user := ProvideUser()
	ctx := context.WithValue(context.Background(), model.ContextKeyCurUserID, user.ID)
	tag, _ := model.NewTag(ctx, "test", "testDesc")
	assert.Equal(t, tag.Title, "test", "title should be equal")
	assert.Equal(t, tag.Description, "testDesc", "description should be equal")
	assert.Equal(t, tag.ScopeType, "me", "scope_type should be equal 'user'")
	assert.Equal(t, tag.ScopeID, user.ID, "scope_id should be equal user.id")
}

func TestNewTagging(t *testing.T) {
	user := ProvideUser()
	ctx := context.WithValue(context.Background(), model.ContextKeyCurUserID, user.ID)
	project := ProvideProject(ctx)
	ctx = context.WithValue(ctx, model.ContextKeyCurProjectID, project.ID)
	section := ProvideProject(ctx)
	ctx = context.WithValue(ctx, model.ContextKeyCurSectionID, section.ID)
	task, _ := model.NewTask(ctx, "testTask", "testTaskDesc")
	tag, _ := model.NewTag(ctx, "testTag", "testTagDesc")
	tagging, _ := model.NewTagging(ctx, tag.ID, "task", task.ID)
	nilTime := (*time.Time)(nil)
	assert.NotEqual(t, project.CreatedAt, nilTime, "created_at should not be nil")
	assert.Equal(t, tagging.CreatedByID, user.ID, "created_by_id should be equal to user.id")
	assert.Equal(t, tagging.TagID, tag.ID, "tag_id should be equal to tag.id")
	assert.Equal(t, tagging.TargetType, "task", "target_type should be equal to task")
	assert.Equal(t, tagging.TargetID, task.ID, "target_id should be equal to task.id")
}
