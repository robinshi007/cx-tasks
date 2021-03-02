package in

// Input definition -
type NewTask struct {
	Name string `valid:"required"`
}
type EditTask struct {
	ID   string `valid:"int,required"`
	Name string `valid:"required"`
}
type FetchTask struct {
	ID string `valid: "int,required"`
}
type FetchTaskByName struct {
	Name string `valid:"required"`
}
