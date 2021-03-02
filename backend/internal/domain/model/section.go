package model

import (
	"context"
	"errors"
)

// Section
type Section struct {
	BaseWithBy

	Name        string `json:"name" db:"name"`
	Description string `json:"description" db:"description"`

	OrderNum int64 `json:"order_num" db:"order_num"`

	Project   *Project `json:"project,omitempty" db:"project"`
	ProjectID int64    `json:"-" db:"project_id"`
}

func NewSection(ctx context.Context, name string, description string) (sec *Section, err error) {
	sec = &Section{
		Name:        name,
		Description: description,
	}
	err = sec.BeforeInsert(ctx)
	return sec, err
}
func NewSectionForUpdate(ctx context.Context, id int64) (sec *Section, err error) {
	sec = &Section{
		BaseWithBy: BaseWithBy{
			ID: id,
		},
	}
	err = sec.BeforeUpdate(ctx)
	return
}
func NewSectionForDelete(ctx context.Context, id int64) (sec *Section, err error) {
	sec = &Section{
		BaseWithBy: BaseWithBy{
			ID: id,
		},
	}
	err = sec.BeforeDelete(ctx)
	return
}

func (m *Section) BeforeInsert(ctx context.Context) (err error) {
	err = m.BaseWithBy.BeforeInsert(ctx)
	if err != nil {
		return
	}
	projectID, ok := ctx.Value(ContextKeyCurProjectID).(int64)
	if !ok {
		return errors.New("context key 'ContextKeyCurProjectID' is not in the context")
	}
	m.ProjectID = projectID
	return
}
