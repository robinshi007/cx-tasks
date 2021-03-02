package rest

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/google/wire"

	"github.com/robinshi007/cx-tasks/infra/log"
	"github.com/robinshi007/cx-tasks/infra/srz"
	"github.com/robinshi007/cx-tasks/internal/domain/model"
	"github.com/robinshi007/cx-tasks/internal/domain/usecase"
	"github.com/robinshi007/cx-tasks/internal/domain/usecase/in"
	"github.com/robinshi007/cx-tasks/internal/pkg/http/shared"
)

func NewTaskRouter(th TaskHandler) http.Handler {
	r := chi.NewRouter()
	r.Get("/", th.FindAll)
	r.Post("/", th.Create)
	r.Get("/{id:[0-9]+}", th.FindByID)
	r.Put("/{id:[0-9]+}", th.Update)
	r.Delete("/{id:[0-9]+}", th.Delete)
	r.Get("/{name:[a-zA-Z0-9]+}/by_name", th.FindByName)
	r.Get("/count", th.Count)

	return r
}

func NewTaskHandler(uc usecase.TaskUsecase, srzr srz.Serializer, logger log.Logger) TaskHandler {
	return &taskHandler{
		uc:     uc,
		srzr:   srzr,
		logger: logger,
	}
}

type TaskHandler interface {
	Count(w http.ResponseWriter, r *http.Request)
	FindAll(w http.ResponseWriter, r *http.Request)
	FindByID(w http.ResponseWriter, r *http.Request)
	FindByName(w http.ResponseWriter, r *http.Request)
	Create(w http.ResponseWriter, r *http.Request)
	Update(w http.ResponseWriter, r *http.Request)
	Delete(w http.ResponseWriter, r *http.Request)
}

type taskHandler struct {
	uc     usecase.TaskUsecase
	srzr   srz.Serializer
	logger log.Logger
}

func (t *taskHandler) Count(w http.ResponseWriter, r *http.Request) {
	res, err := t.uc.Count(r.Context())
	shared.RspErrOrOK(w, err, res)
}

func (t *taskHandler) FindAll(w http.ResponseWriter, r *http.Request) {
	res, err := t.uc.FindAll(r.Context(), model.DefaultListOptions())
	shared.RspErrOrOK(w, err, res)
}
func (t *taskHandler) FindByID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	task := in.FetchTask{ID: id}
	res, err := t.uc.FindByID(r.Context(), &task)
	shared.RspErrOrOK(w, err, res)
}
func (t *taskHandler) FindByName(w http.ResponseWriter, r *http.Request) {
	name := chi.URLParam(r, "name")
	task := in.FetchTaskByName{Name: name}
	res, err := t.uc.FindByName(r.Context(), &task)
	shared.RspErrOrOK(w, err, res)
}

func (t *taskHandler) Create(w http.ResponseWriter, r *http.Request) {
	task := in.NewTask{}
	err := t.srzr.DecodeFromReader(r.Body, &task)
	if err != nil {
		shared.RspErr(w, model.NewErrBadRequest())
	}
	res, err := t.uc.Create(r.Context(), &task)
	shared.RspErrOrOK(w, err, res)
}
func (t *taskHandler) Update(w http.ResponseWriter, r *http.Request) {
	task := in.EditTask{}
	err := t.srzr.DecodeFromReader(r.Body, &task)
	if err != nil {
		shared.RspErr(w, model.NewErrBadRequest())
	}
	id := chi.URLParam(r, "id")
	task.ID = id
	newTask, err := t.uc.Update(r.Context(), &task)
	shared.RspErrOrOK(w, err, newTask)
}
func (t *taskHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	err := t.uc.Delete(r.Context(), &in.FetchTask{ID: id})
	shared.RspErrOrOK(w, err, nil)
}

var _ TaskHandler = (*taskHandler)(nil)

var ProviderSet = wire.NewSet(NewTaskHandler)
