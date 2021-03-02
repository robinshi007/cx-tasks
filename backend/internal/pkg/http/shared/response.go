package shared

import (
	"net/http"
	"strconv"

	"github.com/robinshi007/cx-tasks/internal/domain/model"
)

// Response - defined response json format
type Response struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}
type RestErrorResponse struct {
	Success bool       `json:"success"`
	Error   *RestError `json:"error"`
}

// GraphQLResponse -
type GraphQLResponse struct {
	Data   interface{}     `json:"data"`
	Errors []*GraphQLError `json:"errors"`
}

// NewResponse -
func NewResponse(res interface{}) *Response {
	return &Response{
		Success: true,
		Data:    res,
		Message: "",
	}
}

// NewRestErrorResponse -
func NewRestErrorResponse(code int, message string) *RestErrorResponse {
	return &RestErrorResponse{
		Success: false,
		Error: &RestError{
			Status:  code,
			Code:    strconv.Itoa(code),
			Message: message,
		},
	}
}

// NewGraphQLErrorResponse -
func NewGraphQLErrorResponse(message, path string) *GraphQLResponse {
	return &GraphQLResponse{
		Errors: []*GraphQLError{
			&GraphQLError{
				Message: message,
				Path:    []string{path},
			},
		},
		Data: nil,
	}
}

func GetRestErrorResponse(err *model.Error) *RestErrorResponse {
	switch err.Code {
	case "101":
		return NewRestErrorResponse(http.StatusBadRequest, err.Message)
	case "102":
		return NewRestErrorResponse(http.StatusNotFound, err.Message)
	case "103":
		return NewRestErrorResponse(http.StatusNotModified, err.Message)
	case "104":
		return NewRestErrorResponse(http.StatusConflict, err.Message)
	case "105":
		return NewRestErrorResponse(http.StatusInternalServerError, err.Message)
	case "106":
		return NewRestErrorResponse(http.StatusMethodNotAllowed, err.Message)
	case "201":
		return NewRestErrorResponse(http.StatusUnauthorized, err.Message)
	case "202":
		return NewRestErrorResponse(http.StatusUnauthorized, err.Message)
	case "203":
		return NewRestErrorResponse(http.StatusUnauthorized, err.Message)
	case "204":
		return NewRestErrorResponse(http.StatusUnauthorized, err.Message)
	case "205":
		return NewRestErrorResponse(http.StatusUnauthorized, err.Message)
	case "301":
		return NewRestErrorResponse(http.StatusRequestTimeout, err.Message)
	case "302":
		return NewRestErrorResponse(http.StatusTooManyRequests, err.Message)
	default:
		return NewRestErrorResponse(http.StatusInternalServerError, err.Message)
	}
}
