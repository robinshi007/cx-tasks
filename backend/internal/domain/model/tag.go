package model

import (
	"context"
	"errors"
)

// Tag
type Tag struct {
	BaseWithBy

	Name        string `json:"name" db:"name"`
	Description string `json:"description" db:"description"`

	ScopeType string `json:"scope_type" db:"scope_type"`
	ScopeID   int64  `json:"scope_id" db:"scope_id"`
}

func NewTag(ctx context.Context, name string, description string) (tag *Tag, err error) {
	tag = &Tag{
		Name:        name,
		Description: description,
	}
	err = tag.BeforeInsert(ctx)
	return tag, err
}
func (m *Tag) BeforeInsert(ctx context.Context) (err error) {
	// tag scope type include 'me' and 'project'
	err = m.BaseWithBy.BeforeInsert(ctx)
	projectID, ok := ctx.Value(ContextKeyCurProjectID).(int64)
	if !ok {
		userID, ok := ctx.Value(ContextKeyCurUserID).(int64)
		if !ok {
			return errors.New("context key 'ContextKeyCurProjectID' and 'ContextKeyCurUserID' are not in the context")
		}
		m.ScopeType = "me"
		m.ScopeID = userID
		return
	}
	m.ScopeType = "project"
	m.ScopeID = projectID
	return
}
func (m *Tag) BeforeUpdate(ctx context.Context) (err error) {
	return m.BaseWithBy.BeforeUpdate(ctx)
}
func (m *Tag) BeforeDelete(ctx context.Context) (err error) {
	return m.BaseWithBy.BeforeDelete(ctx)
}

// Tagging
type Tagging struct {
	BaseWithBy

	TagID      int64  `json:"tag_id" db:"tag_id"`
	TargetType string `json:"target_type" db:"target_type"`
	TargetID   int64  `json:"target_id" db:"target_id"`

	OrderNum int64 `json:"order_num" db:"order_num"`
}

func NewTagging(ctx context.Context, tagID int64, targetType string, targetID int64) (tagging *Tagging, err error) {
	tagging = &Tagging{
		TagID:      tagID,
		TargetType: targetType,
		TargetID:   targetID,
	}
	err = tagging.BeforeInsert(ctx)
	return
}

func (m *Tagging) BeforeInsert(ctx context.Context) (err error) {
	return m.BaseWithBy.BeforeInsert(ctx)
}
func (m *Tagging) BeforeDelete(ctx context.Context) (err error) {
	return m.BaseWithBy.BeforeDelete(ctx)
}
