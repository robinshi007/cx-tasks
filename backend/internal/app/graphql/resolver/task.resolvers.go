package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/robinshi007/cx-tasks/internal/app/graphql/gen"
	"github.com/robinshi007/cx-tasks/internal/domain/model"
	"github.com/robinshi007/cx-tasks/internal/pkg/util"
)

func (r *taskResolver) CreatedAt(ctx context.Context, obj *model.Task) (string, error) {
	res := obj.CreatedAt.Format(util.TimeFormatStr)
	return res, nil
}

func (r *taskResolver) UpdatedAt(ctx context.Context, obj *model.Task) (string, error) {
	res := obj.UpdatedAt.Format(util.TimeFormatStr)
	return res, nil
}

func (r *taskResolver) DeletedAt(ctx context.Context, obj *model.Task) (string, error) {
	res := obj.DeletedAt.Format(util.TimeFormatStr)
	return res, nil
}

// Task returns gen.TaskResolver implementation.
func (r *Resolver) Task() gen.TaskResolver { return &taskResolver{r} }

type taskResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *taskResolver) Name(ctx context.Context, obj *model.Task) (string, error) {
	return obj.Name, nil
}
func (r *taskResolver) ID(ctx context.Context, obj *model.Task) (string, error) {
	res := util.Int642Str(obj.ID)
	return res, nil
}
