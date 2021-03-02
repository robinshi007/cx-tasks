package shared

import (
	"encoding/json"
	"net/http"

	"github.com/robinshi007/cx-tasks/internal/domain/model"
)

// alias
var RspErr = RespondWithJsonError
var RspOK = RespondWithJsonOK
var RspErrOrOK = RespondWithJsonErrOrOK

func RespondWithJson(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

func RespondWithJsonError(w http.ResponseWriter, err error) {
	var errResp *RestErrorResponse
	switch err.(type) {
	case *model.Error:
		errResp = GetRestErrorResponse(err.(*model.Error))
	default:
		errResp = NewRestErrorResponse(http.StatusInternalServerError, err.Error())
	}
	RespondWithJson(w, errResp.Error.Status, errResp)
}

func RespondWithJsonOK(w http.ResponseWriter, payload interface{}) {
	RespondWithJson(w, http.StatusOK, NewResponse(payload))
}
func RespondWithJsonErrOrOK(w http.ResponseWriter, err error, data interface{}) {
	if err != nil {
		RspErr(w, err)
	} else {
		RspOK(w, data)
	}

}
