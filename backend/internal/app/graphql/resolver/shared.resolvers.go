package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/robinshi007/cx-tasks/internal/app/graphql/gen"
	"github.com/robinshi007/cx-tasks/internal/domain/model"
	"github.com/robinshi007/cx-tasks/internal/domain/usecase/in"
)

func (r *mutationResolver) CreateTask(ctx context.Context, input in.NewTask) (*model.Task, error) {
	taskID, err := r.TaskUC.Create(ctx, &input)
	if err != nil {
		return nil, err
	}
	task, _ := r.TaskUC.FindByID(ctx, &in.FetchTask{ID: string(taskID)})
	return task, nil
}

func (r *mutationResolver) UpdateTask(ctx context.Context, input in.EditTask) (*model.Task, error) {
	return r.TaskUC.Update(ctx, &input)
}

func (r *mutationResolver) DeleteTask(ctx context.Context, input in.FetchTask) (*model.Task, error) {
	task, err := r.TaskUC.FindByID(ctx, &input)
	if err != nil {
		return nil, err
	}
	err = r.TaskUC.Delete(ctx, &input)
	if err != nil {
		return nil, err
	}
	return task, nil
}

func (r *queryResolver) Tasks(ctx context.Context) ([]*model.Task, error) {
	return r.TaskUC.FindAll(ctx, model.DefaultListOptions())
}

func (r *queryResolver) FetchTask(ctx context.Context, input in.FetchTask) (*model.Task, error) {
	return r.TaskUC.FindByID(ctx, &input)
}

// Mutation returns gen.MutationResolver implementation.
func (r *Resolver) Mutation() gen.MutationResolver { return &mutationResolver{r} }

// Query returns gen.QueryResolver implementation.
func (r *Resolver) Query() gen.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
