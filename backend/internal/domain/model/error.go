package model

import "fmt"

type Error struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

func (e *Error) Error() string {
	return fmt.Sprintf("[%s]: %s", e.Code, e.Message)
}

// BadRequest
func NewErrBadRequest() *Error {
	return &Error{
		Code:    "101",
		Message: "Bad Request",
	}
}

// EntityNotFound
func NewErrEntityNotFound() *Error {
	return &Error{
		Code:    "102",
		Message: "Entity Not Found",
	}
}

// EntityNotChanged
func NewErrEntityNotChanged() *Error {
	return &Error{
		Code:    "103",
		Message: "Entity Not Changed",
	}
}

// Conflict
func NewErrRouteNotFound() *Error {
	return &Error{
		Code:    "104",
		Message: "Route Not Found",
	}
}

// InternalServerError
func NewErrInternalServerError() *Error {
	return &Error{
		Code:    "105",
		Message: "Ohh, Internal Server Error",
	}
}

// HTTPMethodNotAllowed
func NewErrMethodNotAllowed() *Error {
	return &Error{
		Code:    "106",
		Message: "HTTP Method Not Allowed",
	}
}

// BadUserPassword
func NewErrBadUsernameOrPassword() *Error {
	return &Error{
		Code:    "201",
		Message: "Account Name Or Password Does Not Match",
	}
}

// NotAuthenticated
func NewErrNotAuthenticated() *Error {
	return &Error{
		Code:    "202",
		Message: "Not Authenticated",
	}
}

// NotAuthorized
func NewErrNotAuthorized() *Error {
	return &Error{
		Code:    "203",
		Message: "Not Authorized",
	}
}

// TokenEmpty
func NewErrTokenEmpty() *Error {
	return &Error{
		Code:    "204",
		Message: "Token Is Empty",
	}
}

// TokenExpiredError
func NewErrTokenExpired() *Error {
	return &Error{
		Code:    "205",
		Message: "Token Is Expired",
	}
}

// RequestTimeout
func NewErrRequestTimeout() *Error {
	return &Error{
		Code:    "301",
		Message: "Request Is Timeout",
	}
}

// Request
func NewErrTooManyRequests() *Error {
	return &Error{
		Code:    "302",
		Message: "Too Many Requests",
	}
}

// DBQueryBuilder
func NewErrDBBadQuery() *Error {
	return &Error{
		Code:    "401",
		Message: "Database Query Builder error",
	}
}

// DBSelect
func NewErrDBBadSelect() *Error {
	return &Error{
		Code:    "402",
		Message: "Database Select error",
	}
}

// DBExec
func NewErrDBBadExec() *Error {
	return &Error{
		Code:    "403",
		Message: "Database Exec error",
	}
}
