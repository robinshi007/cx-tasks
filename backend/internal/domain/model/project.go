package model

import (
	"context"
	"time"
)

// Project
type Project struct {
	BaseWithBy

	Name        string `json:"name" db:"name"`
	Description string `json:"description" db:"description"`

	IsArchived bool       `json:"is_archived" db:"is_archived"`
	StartTime  *time.Time `json:"start_time" db:"start_time"`
	DueTime    *time.Time `json:"due_time" db:"due_time"`

	Owner   *User `json:"owner,omitempty" db:"owner"`
	OwnerID int64 `json:"-" db:"owner_id"`

	Sections []*Section `json:"sections" db:"-"`
	Tasks    []*Task    `json:"tasks,omitempty" db:"-"`
}

func NewProject(ctx context.Context, name string, description string) (project *Project, err error) {
	project = &Project{
		Name:        name,
		Description: description,
	}
	err = project.BeforeInsert(ctx)
	return project, err
}
func NewProjectForUpdate(ctx context.Context, id int64) (m *Project, err error) {
	m = &Project{
		BaseWithBy: BaseWithBy{
			ID: id,
		},
	}
	err = m.BeforeUpdate(ctx)
	return
}

func NewProjectForDelete(ctx context.Context, id int64) (m *Project, err error) {
	m = &Project{
		BaseWithBy: BaseWithBy{
			ID: id,
		},
	}
	err = m.BeforeDelete(ctx)
	return
}

func (m *Project) BeforeInsert(ctx context.Context) (err error) {
	err = m.BaseWithBy.BeforeInsert(ctx)
	m.OwnerID = m.CreatedByID
	return
}
func (m *Project) BeforeUpdate(ctx context.Context) error {
	return m.BaseWithBy.BeforeUpdate(ctx)
}
func (m *Project) BeforeDelete(ctx context.Context) error {
	return m.BaseWithBy.BeforeDelete(ctx)
}
