1. As a user, I want to create a new project to manage my daily tasks.

- Go to "projects" subnav at "CxTasks" tab after I logged in
- The project list is order by due date by default
- Go to the project detail page by click the name of the project item
- Filter the project by search project name, cancel the search filter by click the close icon at the search box
- Create a project by click "Create project" button at the top right corner.
- Star a project by click start icon at the front of the project item.
- The new project form only provide "name","description" and "due date" field.
- The task status field is defined at project setting, default value is "To Do", "In Progress", "Done"

2. As a user, I want to create a new task to track my daily work.

- Go to the "backlog" subnav in project detail page, click "Create task" button at the bottom of the backlog list
- You can also create task by click the "Add" icon at the main sidebar.
  The extra field "project" need to by filled here because there is no context info.
- The new task form contains fields "name", "description", "project", "section", "status", "due date", "assignee" and "priority",
- The default value "assignee" is the "creator"

3. As a user, I want to the new created task can be see at the board for better visial tracking.

- The "backlog" is a draft box, it contains many new created task with status "new", which is not show in the board.
- If you want to see the new created task in the board, please change the status of the task to "todo"

4. As a user, I want to group the tasks by category to track progress

- The "section" is similar to the category or the stage/phase, you can organize the tasks by "section" to track progress
- The section contains fields "name", "description", "color"
- The section is created and managed by project owner
