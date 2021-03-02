package model

import (
	"context"
	"time"
)

// User represent user domain model
type User struct {
	Base

	FirstName string `json:"first_name" db:"first_name"`
	LastName  string `json:"last_name" db:"last_name"`
	UserName  string `json:"user_name" db:"user_name"`
	Password  string `json:"-" db:"password"`
	Email     string `json:"email" db:"email"`

	IsActive bool `json:"active" db:"is_active"`

	Token     string     `json:"-" db:"token"`
	LastLogin *time.Time `json:"-" db:"last_login"`

	LastPasswordChange *time.Time `json:"-" db:"last_password_change"`

	OwnedProjects []*Project `json:"owned_projects" `
}

func NewUser(ctx context.Context, user_name string, email string, password string) (m *User, err error) {
	m = &User{
		UserName: user_name,
		Email:    email,
		Password: password,
	}
	err = m.BeforeInsert(ctx)
	return
}
func NewUserForUpdate(ctx context.Context, id int64) (m *User, err error) {
	m = &User{
		Base: Base{
			ID: id,
		},
	}
	err = m.BeforeUpdate(ctx)
	return
}
func NewUserForDelete(ctx context.Context, id int64) (m *User, err error) {
	m = &User{
		Base: Base{
			ID: id,
		},
	}
	err = m.BeforeDelete(ctx)
	return
}

// ChangePassword updates user's password related fields
func (m *User) ChangePassword(hash string) {
	now := time.Now()
	m.Password = hash
	m.LastPasswordChange = &now
	m.UpdatedAt = now
}

// UpdateLastLogin updates last login field
func (m *User) UpdateLastLogin(token string) {
	now := time.Now()
	m.Token = token
	m.LastLogin = &now
}

func (m *User) BeforeInsert(ctx context.Context) (err error) {
	err = m.Base.BeforeInsert(ctx)
	m.IsActive = true
	m.LastPasswordChange = &m.Base.UpdatedAt
	return
}

func (m *User) BeforeUpdate(ctx context.Context) error {
	return m.Base.BeforeUpdate(ctx)
}

func (m *User) BeforeDelete(ctx context.Context) error {
	return m.Base.BeforeDelete(ctx)
}
