package shared

import (
	"net/http"

	"github.com/robinshi007/cx-tasks/internal/domain/model"
)

func MethodNotAllowedHandler(w http.ResponseWriter, r *http.Request) {
	RspErr(w, model.NewErrMethodNotAllowed())
}

func NotFoundHandler(w http.ResponseWriter, r *http.Request) {
	RspErr(w, model.NewErrRouteNotFound())
}
func SayHello(w http.ResponseWriter, r *http.Request) {
	RspOK(w, NewResponse("Hi Cx Apps!"))
}

func TestLogger(w http.ResponseWriter, r *http.Request) {
	RspOK(w, NewResponse("Test logger"))
}
