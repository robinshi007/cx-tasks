## CxTasks

A Task/Project management webapp like simplified Asana and Trello

## Folder Structure

- doc: contains user stories, design notes and development notes.
- design: contains sketch files and design output files(page png, icon svg, favicon, etc.)
- webapp/src/prototype: contains react static pages based on design pages
- webapp: react webapp with router, state management and proxy to backend server
- backend: golang clean architecture based project

## Tools

- Sketch: for icon and page design use.
- NeoVim&VsCode: for doc and code editing.
- iTerm2&Tmux: for terminal management.
- Git&Github: for doc and code version management.
- Chrome browser: for webapp test by manual.

## Workflow

- [product] Do research on product design of Asana, Trello and Clickup
- [product] Write use stories based on the research
- [design] Design the high-fidelity pages in sketch app
- [frontend] Implement static pages using react
- [frontend] Implement dynamic pages(router, state management, async fetch) with mock data using react
- [interface] Design the backend API spec
- [backend] Design and implement entity and relationship, setup up unit test
- [backend] Design database tables and implement SQL with golang migrate library
- [backend] Design and implement repository, setup up repository test
- [backend] Design and implement usecase, setup up usecase test
- [backend] Design and implement REST handler, setup up handler test
- [testing] Testing using Chrome by manual based on user story
- Release the MVP(Minimum Viable Product) version to public(github)

## Plan

## Phase1

The stories are defined in the [Epic1](./doc/story/epic.md):

Current status:

- [done] [product] Do research on product design of Asana, Trello and Clickup
- [done] [product] Write use stories based on the research
- [done] [design] Design the high-fidelity pages in sketch app
- [done] [frontend] Implement static pages using react
- [done] [frontend] Implement dynamic pages(router, state management, async fetch) with mock data using react
- [done] [frontend] Add modal and select components
- [done] [frontend] Add new forms for project and todo
- [done] [frontend] Finish phase 1 features: login -> my work -> projects -> project board with filters and dragdrop -> new project/task form
- [done] [frontend] Add redirect to 404 page if entity is not found or server internal error
- [done] [frontend] Replace the project with alpha transparency support
- [todo] [frontend] Add context select list at side nav
- [todo] [frontend] Add section association to each project
- [todo] [frontend] Bolish the task form using react-hook-form library
- [todo] [frontend] Implement a toast component for action feedback
- [todo] [interface] Design the backend API spec

## Refer apps

- [Asana](https://asana.com/)
- [Trello](https://trello.com/)
- [JIRA](https://www.atlassian.com/software/jira)
