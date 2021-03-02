package model

// Comment
type Comment struct {
	BaseWithBy

	Description string `json:"description" db:"description"`

	ScopeType string `json:"scope_type" db:"scope_type"`
	ScopeID   int64  `json:"scope_id" db:"scope_id"`
}

// Commenting
type Commenting struct {
	CommentID int64 `json:"comment_id" db:"comment_id"`

	TargetType string `json:"target_type" db:"target_type"`
	TargetID   int64  `json:"target_id" db:"target_id"`
}
