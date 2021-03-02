package dbm

import (
	"context"

	"github.com/robinshi007/cx-tasks/internal/domain/usecase/in"
)

func (m *Migration) SeedData() (err error) {
	ctx := context.Background()
	if count, _ := m.tuc.Count(ctx); count != 0 {
		// don't create date when record count is not 0
		return
	}
	tasks := []*in.NewTask{
		&in.NewTask{Name: "Task01"},
		&in.NewTask{Name: "Task02"},
	}
	for _, task := range tasks {
		id, err := m.tuc.Create(ctx, task)
		if err != nil {
			m.logger.Error(ctx, "%s", err)
			return err
		}
		m.logger.Info(ctx, "Task created: ID={%s}", string(id))
	}
	return err
}
