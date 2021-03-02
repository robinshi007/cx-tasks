package postgres

type PageFilter struct {
	Limit   int
	Offset  int
	PerPage int
	Page    int
}

func NewPageFilter() *PageFilter {
	return &PageFilter{
		PerPage: 20,
	}
}

type Set map[string]interface{}
