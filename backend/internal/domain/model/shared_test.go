package model_test

import (
	"context"
	"fmt"
	"math/rand"
	"time"

	"github.com/robinshi007/cx-tasks/internal/domain/model"
)

var COUNT_ID int = 1000
var COUNT_SHORT int = 6
var COUNT_LONG int = 15

func init() {
	rand.Seed(time.Now().UnixNano())
}

// seed functions {{{
var seedLetters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
var seedNames = []string{
	"admin",
	"user",
	"test",
	"hi",
	"hello",
	"bye",
	"good",
	"great",
	"org",
	"com",
	"created",
	"updated",
	"deleted",
}

func RandomString(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = seedLetters[rand.Intn(len(seedLetters))]
	}
	return string(b)
}
func RandomName() string {
	return seedNames[rand.Intn(len(seedNames))]
} // }}}

func ProvideUser() *model.User {
	name := RandomString(COUNT_SHORT)
	email := fmt.Sprintf("%s@%s.%s", RandomName(), RandomName(), RandomName())
	password := RandomString(COUNT_LONG)
	user := model.NewUser(context.Background(), name, email, password)
	user.ID = int64(rand.Intn(COUNT_ID))
	return user
}
func ProvideProject(ctx context.Context) *model.Project {
	project, _ := model.NewProject(ctx, RandomString(COUNT_SHORT), RandomString(COUNT_LONG))
	project.ID = int64(rand.Intn(COUNT_ID))
	return project
}

func ProvideSection(ctx context.Context) *model.Section {
	section, _ := model.NewSection(ctx, RandomString(COUNT_SHORT), RandomString(COUNT_LONG))
	section.ID = int64(rand.Intn(COUNT_ID))
	return section
}
