package model_test

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"

	"github.com/robinshi007/cx-tasks/internal/domain/model"
)

func TestNewSection(t *testing.T) {
	user := ProvideUser()
	ctx := context.WithValue(context.Background(), model.ContextKeyCurUserID, user.ID)
	project := ProvideProject(ctx)
	ctx = context.WithValue(ctx, model.ContextKeyCurProjectID, project.ID)
	section, _ := model.NewSection(ctx, "test", "testDesc")
	nilTime := (*time.Time)(nil)
	assert.Equal(t, section.Name, "test", "name should be equal")
	assert.Equal(t, section.Description, "testDesc", "description should be equal")
	assert.NotEqual(t, section.CreatedAt, nilTime, "created_at should not be nil")
	assert.NotEqual(t, section.UpdatedAt, nilTime, "updated_at should not be nil")
	assert.Equal(t, section.DeletedAt, nilTime, "deleted_at should be nil")
	assert.Equal(t, section.CreatedByID, user.ID, "created_by_id should be equal to user.id")
	assert.Equal(t, section.ProjectID, project.ID, "project_id should be equal to project.id")
}
