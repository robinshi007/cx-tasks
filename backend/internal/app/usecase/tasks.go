package usecase

import (
	"context"

	"github.com/google/wire"
	"github.com/robinshi007/cx-tasks/infra/log"
	"github.com/robinshi007/cx-tasks/internal/domain/model"
	repo_int "github.com/robinshi007/cx-tasks/internal/domain/repository"
	"github.com/robinshi007/cx-tasks/internal/domain/usecase"
	"github.com/robinshi007/cx-tasks/internal/domain/usecase/in"
	"github.com/robinshi007/cx-tasks/internal/domain/usecase/out"
	"github.com/robinshi007/cx-tasks/internal/pkg/util"
)

func NewTaskUsecase(repo repo_int.TaskRepository, logger log.Logger) usecase.TaskUsecase {
	return &taskUsecase{repo: repo, logger: logger}

}

type taskUsecase struct {
	repo   repo_int.TaskRepository
	logger log.Logger
}

func (t *taskUsecase) Count(ctx context.Context) (int64, error) {
	return t.repo.Count(ctx)
}
func (t *taskUsecase) FindAll(ctx context.Context, opt *model.ListOptions) ([]*model.Task, error) {
	tasks, err := t.repo.FindAll(ctx, opt)
	if err != nil {
		return nil, err
	}
	return tasks, nil
}
func (t *taskUsecase) FindByID(ctx context.Context, input *in.FetchTask) (*model.Task, error) {
	id, err := util.Str2Int64(input.ID)
	if err != nil {
		return nil, model.NewErrBadRequest()
	}
	return t.repo.FindByID(ctx, id)
}
func (t *taskUsecase) FindByName(ctx context.Context, input *in.FetchTaskByName) (*model.Task, error) {
	return t.repo.FindByName(ctx, input.Name)
}
func (t *taskUsecase) Create(ctx context.Context, input *in.NewTask) (out.ID, error) {
	if err := in.Validate(input); err != nil {
		t.logger.Debug(ctx, "err: %v", err)
		return out.ID("-1"), model.NewErrBadRequest()
	}
	res, err := t.repo.Create(ctx, &model.Task{
		Name: input.Name,
	})
	if err != nil {
		return out.ID("-1"), model.NewErrBadRequest()
	}
	return out.ID(util.Int642Str(res)), nil
}
func (t *taskUsecase) Update(ctx context.Context, input *in.EditTask) (*model.Task, error) {
	if err := in.Validate(input); err != nil {
		return nil, model.NewErrBadRequest()
	}
	id, err := util.Str2Int64(input.ID)
	if err != nil {
		return nil, model.NewErrBadRequest()
	}
	task, err := t.repo.FindByID(ctx, id)
	if err != nil {
		return nil, model.NewErrEntityNotFound()
	}
	if task.Name == input.Name {
		return nil, model.NewErrEntityNotChanged()
	}
	task.Name = input.Name
	return t.repo.Update(ctx, task)
}
func (t *taskUsecase) Delete(ctx context.Context, input *in.FetchTask) error {
	if err := in.Validate(input); err != nil {
		return model.NewErrBadRequest()
	}
	id, err := util.Str2Int64(input.ID)
	if err != nil {
		return model.NewErrBadRequest()
	}
	m, _ := model.NewTaskForDelete(ctx, id)
	return t.repo.Delete(ctx, m)
}

var ProviderSet = wire.NewSet(NewTaskUsecase)
