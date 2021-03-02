package model

import (
	"context"
	"time"
)

// Task -
type Task struct {
	BaseWithBy

	Name        string `json:"name" db:"name"`
	Description string `json:"description" db:"description"`

	IsDone     bool       `json:"is_done" db:"is_done"`
	IsArchived bool       `json:"is_archived" db:"is_archived"`
	StartTime  *time.Time `json:"start_time" db:"start_time"`
	DueTime    *time.Time `json:"due_time" db:"due_time"`

	Assignee   *User `json:"assignee,omitempty" db:"assignee"`
	AssigneeID int64 `json:"-" db:"assignee_id"`

	Project   *Project `json:"project,omitempty" db:"project"`
	ProjectID int64    `json:"-" db:"project_id"`
	Section   *Section `json:"section,omitempty" db:"section"`
	SectionID int64    `json:"-" db:"section_id"`

	Tags []*Tag `json:"tags" db:"-"`
}

func NewTask(ctx context.Context, name string, description string) (task *Task, err error) {
	task = &Task{
		Name:        name,
		Description: description,
	}
	err = task.BeforeInsert(ctx)
	return task, err
}

func NewTaskForUpdate(ctx context.Context, id int64) (m *Task, err error) {
	m = &Task{
		BaseWithBy: BaseWithBy{
			ID: id,
		},
	}
	err = m.BeforeUpdate(ctx)
	return
}

func NewTaskForDelete(ctx context.Context, id int64) (m *Task, err error) {
	m = &Task{
		BaseWithBy: BaseWithBy{
			ID: id,
		},
	}
	err = m.BeforeDelete(ctx)
	return
}

func (m *Task) BeforeInsert(ctx context.Context) (err error) {
	err = m.BaseWithBy.BeforeInsert(ctx)
	if err != nil {
		return
	}
	projectID, ok := ctx.Value(ContextKeyCurProjectID).(int64)
	if !ok {
		// set as zero value
		projectID = int64(0)
	}
	m.ProjectID = projectID
	sectionID, ok := ctx.Value(ContextKeyCurSectionID).(int64)
	if !ok {
		sectionID = int64(0)
	}
	m.SectionID = sectionID
	m.AssigneeID = m.CreatedByID
	return
}
