package shared

// RestError -
type RestError struct {
	Status  int    `json:"-"`
	Code    string `json:"code"`
	Message string `json:"message"`
}

// GraphQLError -
type GraphQLError struct {
	Message string   `json:"message"`
	Path    []string `json:"path"`
}
