package model

import (
	"context"
	"errors"
	"time"
)

// Base contains common fields for tables
type Base struct {
	ID int64 `json:"id" db:"id,omitempty"`

	CreatedAt time.Time  `json:"created_at" db:"created_at"`
	UpdatedAt time.Time  `json:"updated_at" db:"updated_at"`
	DeletedAt *time.Time `json:"-" db:"deleted_at"`
}

// BeforeInsert hooks into insert operations, setting createdAt and updatedAt to current time
func (b *Base) BeforeInsert(ctx context.Context) (err error) {
	now := time.Now()
	b.CreatedAt = now
	b.UpdatedAt = now
	return err
}

// BeforeUpdate hooks into update operations, setting updatedAt to current time
func (b *Base) BeforeUpdate(ctx context.Context) (err error) {
	b.UpdatedAt = time.Now()
	return err
}

func (b *Base) BeforeDelete(ctx context.Context) (err error) {
	now := time.Now()
	b.DeletedAt = &now
	return err
}

// BaseWithBy contains common fields for tables
type BaseWithBy struct {
	ID int64 `json:"id" db:"id,omitempty"`

	CreatedAt time.Time  `json:"created_at" db:"created_at"`
	UpdatedAt time.Time  `json:"updated_at" db:"updated_at"`
	DeletedAt *time.Time `json:"-" db:"deleted_at"`

	CreatedBy   *User `json:"created_by,omitempty" db:"created"`
	CreatedByID int64 `json:"-" db:"created_by"`
	UpdatedBy   *User `json:"updated_by,omitempty" db:"updated"`
	UpdatedByID int64 `json:"-" db:"updated_by"`
	DeletedBy   *User `json:"deleted_by,omitempty" db:"deleted"`
	DeletedByID int64 `json:"-" db:"deleted_by"`
}

// BeforeInsert hooks into insert operations, setting createdAt and updatedAt to current time
func (b *BaseWithBy) BeforeInsert(ctx context.Context) (err error) {
	userID, ok := ctx.Value(ContextKeyCurUserID).(int64)
	if !ok {
		return errors.New("context key 'ContextKeyCurUserID' is not in the context")
	}
	now := time.Now()
	b.CreatedAt = now
	b.UpdatedAt = now
	b.CreatedByID = userID
	b.UpdatedByID = userID
	return
}

// BeforeUpdate hooks into update operations, setting updatedAt to current time
func (b *BaseWithBy) BeforeUpdate(ctx context.Context) (err error) {
	userID, ok := ctx.Value(ContextKeyCurUserID).(int64)
	if !ok {
		return errors.New("context key 'ContextKeyCurUserID' is not in the context")
	}
	b.UpdatedAt = time.Now()
	b.UpdatedByID = userID
	return err
}

func (b *BaseWithBy) BeforeDelete(ctx context.Context) (err error) {
	userID, ok := ctx.Value(ContextKeyCurUserID).(int64)
	if !ok {
		return errors.New("context key 'ContextKeyCurUserID' is not in the context")
	}
	now := time.Now()
	b.DeletedAt = &now
	b.DeletedByID = userID
	return err
}
