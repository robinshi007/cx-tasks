package model_test

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"

	"github.com/robinshi007/cx-tasks/internal/domain/model"
)

func TestNewTask(t *testing.T) {
	user := ProvideUser()
	ctx := context.WithValue(context.Background(), model.ContextKeyCurUserID, user.ID)
	project := ProvideProject(ctx)
	ctx = context.WithValue(ctx, model.ContextKeyCurProjectID, project.ID)
	section := ProvideProject(ctx)
	ctx = context.WithValue(ctx, model.ContextKeyCurSectionID, section.ID)
	task, _ := model.NewTask(ctx, "test", "testDesc")
	nilTime := (*time.Time)(nil)
	assert.Equal(t, task.Name, "test", "name should be equal")
	assert.Equal(t, task.Description, "testDesc", "description should be equal")
	assert.NotEqual(t, task.CreatedAt, nilTime, "created_at should not be nil")
	assert.NotEqual(t, task.UpdatedAt, nilTime, "updated_at should not be nil")
	assert.Equal(t, task.DeletedAt, nilTime, "deleted_at should be nil")
	assert.Equal(t, task.IsArchived, false, "is_archive should be false")
	assert.Equal(t, task.StartTime, nilTime, "start_time should be nil")
	assert.Equal(t, task.DueTime, nilTime, "due_time should be nil")
	assert.Equal(t, task.CreatedByID, user.ID, "created_by_id should be equal to user.id")
	assert.Equal(t, task.ProjectID, project.ID, "project_id should be equal to project.id")
	assert.Equal(t, task.SectionID, section.ID, "section_id should be equal to section.id")
}
