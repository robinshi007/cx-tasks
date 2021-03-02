package util

import "fmt"

func Printf(format string, args ...interface{}) {
	fmt.Printf(format, args...)
}
func Print(args ...interface{}) {
	fmt.Println(args...)
}
func PrintInfof(format string, args ...interface{}) {
	fmt.Printf("=> "+format, args...)
}
func PrintInfo(args ...interface{}) {
	fmt.Println("=> ", args)
}
func PrintWarnf(format string, args ...interface{}) {
	fmt.Printf("?=> "+format, args...)
}
func PrintWarn(args ...interface{}) {
	fmt.Println("?=> ", args)
}
func PrintErrorf(format string, args ...interface{}) {
	fmt.Printf("!=> "+format, args...)
}
func PrintError(args ...interface{}) {
	fmt.Println("!=> ", args)
}
