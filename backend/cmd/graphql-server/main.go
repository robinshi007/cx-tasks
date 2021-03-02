package main

import (
	"context"
	"fmt"
  "flag"

	"github.com/robinshi007/cx-tasks/internal/di"
)

func main() {
	ctx := context.Background()
	var configPath string
	flag.StringVar(&configPath, "configPath", "", "config path")

	flag.Parse()

	m, err := di.InjectMigration(configPath)
	if err != nil {
		panic(err)
	}
	m.Up()
	m.SeedData()

	serv, _ := di.InjectGraphQLServer(configPath)
	if err := serv.Start(ctx); err != nil {
		fmt.Println("!=>", err)
	}

	serv.AwaitSignal(ctx)
}
