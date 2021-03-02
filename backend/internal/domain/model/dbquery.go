package model

import (
	sq "github.com/Masterminds/squirrel"
)

// LimitOffset -
type LimitOffset struct {
	Limit  int // SQL LIMIT count
	Offset int // SQL OFFSET count
}

// ListOptions -
type ListOptions struct {
	Query       string
	Sort        string
	LimitOffset *LimitOffset
}

func DefaultLimitOffset() *LimitOffset {
	return &LimitOffset{
		Limit:  10,
		Offset: 0,
	}
}

func DefaultListOptions() *ListOptions {
	return &ListOptions{
		Query:       "",
		Sort:        "",
		LimitOffset: DefaultLimitOffset(),
	}
}

func SetListOptionsFilter(sb sq.SelectBuilder, lopt *ListOptions) sq.SelectBuilder {
	return sb.Limit(uint64(lopt.LimitOffset.Limit)).Offset(uint64(lopt.LimitOffset.Offset))
}
