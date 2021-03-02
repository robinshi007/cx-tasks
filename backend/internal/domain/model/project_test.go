package model_test

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"

	"github.com/robinshi007/cx-tasks/internal/domain/model"
)

func TestNewProject(t *testing.T) {
	user := ProvideUser()
	ctx := context.WithValue(context.Background(), model.ContextKeyCurUserID, user.ID)
	project, _ := model.NewProject(ctx, "test", "testDesc")
	nilTime := (*time.Time)(nil)
	assert.Equal(t, project.Name, "test", "name should be equal")
	assert.Equal(t, project.Description, "testDesc", "description should be equal")
	assert.NotEqual(t, project.CreatedAt, nilTime, "created_at should not be nil")
	assert.NotEqual(t, project.UpdatedAt, nilTime, "updated_at should not be nil")
	assert.Equal(t, project.DeletedAt, nilTime, "deleted_at should be nil")
	assert.Equal(t, project.IsArchived, false, "is_archive should be false")
	assert.Equal(t, project.StartTime, nilTime, "start_time should be nil")
	assert.Equal(t, project.DueTime, nilTime, "due_time should be nil")
	assert.Equal(t, project.DeletedAt, nilTime, "deleted_at should be nil")
	assert.Equal(t, project.CreatedByID, user.ID, "created_by_id should be equal to user.id")
	assert.Equal(t, project.OwnerID, user.ID, "owner_id should be equal to user.id")
}
