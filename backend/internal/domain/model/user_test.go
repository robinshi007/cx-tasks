package model_test

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"

	"github.com/robinshi007/cx-tasks/internal/domain/model"
)

func TestNewUser(t *testing.T) {
	user := model.NewUser(context.Background(), "test", "test@test.io", "testpass")
	user.BeforeInsert()
	nilTime := (*time.Time)(nil)
	assert.Equal(t, user.UserName, "test", "name should be equal")
	assert.Equal(t, user.Email, "test@test.io", "email should be equal")
	assert.Equal(t, user.IsActive, true, "is_active should be equal")
	assert.NotEqual(t, user.CreatedAt, nilTime, "created_at should not be nil")
	assert.NotEqual(t, user.UpdatedAt, nilTime, "updated_at should not be nil")
	assert.Equal(t, user.LastPasswordChange, &user.CreatedAt, "last_password_change should equal to created_at")
	assert.Equal(t, user.DeletedAt, nilTime, "deleted_at should be nil")
	assert.Equal(t, user.LastLogin, nilTime, "last_login should be nil")
}

func TestChangePassword(t *testing.T) {
	user := model.NewUser(context.Background(), "test", "test@test.io", "testpass")
	user.BeforeInsert()
	user.ChangePassword("newpass")
	assert.NotEqual(t, user.LastPasswordChange, &user.CreatedAt, "last_password_change should not equal to created_at")
}

func TestUpdateLastLogin(t *testing.T) {
	user := model.NewUser(context.Background(), "test", "test@test.io", "testpass")
	user.BeforeInsert()
	user.UpdateLastLogin("token_string")
	assert.NotEqual(t, user.LastLogin, (*time.Time)(nil), "last_login should be not nil")
}
