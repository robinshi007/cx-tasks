CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR (127) NOT NULL,
  description VARCHAR (255),

  is_done BOOLEAN NOT NULL,
  is_archived BOOLEAN NOT NULL,
  start_time TIMESTAMPTZ,
  due_time TIMESTAMPTZ,
  tagging_order integer,

  assignee_id integer NOT NULL,
  project_id integer,
  section_id integer,

  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  deleted_at TIMESTAMPTZ,

  created_by integer NOT NULL,
  updated_by integer NOT NULL,
  deleted_by integer
);

/* ALTER TABLE tasks ADD CONSTRAINT fk_task_project foreign key (project_id) REFERENCES projects; */
/* ALTER TABLE tasks ADD CONSTRAINT fk_task_section foreign key (section_id) REFERENCES sections; */
/* ALTER TABLE tasks ADD CONSTRAINT fk_task_assignee foreign key (assignee_id) REFERENCES users; */
