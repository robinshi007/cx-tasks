package model

type contextKey int

const (
	_ contextKey = iota
	ContextKeyCurUserID
	ContextKeyCurProjectID
	ContextKeyCurSectionID
	//ContextKeyCurTargetType
	//ContextKeyCurTargetID
)
