CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR (127) NOT NULL,
  description VARCHAR (255),

  is_archived BOOLEAN NOT NULL,
  section_order integer,

  start_time TIMESTAMPTZ,
  due_time TIMESTAMPTZ,

  owner_id integer NOT NULL,

  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  deleted_at TIMESTAMPTZ,

  created_by integer NOT NULL,
  updated_by integer NOT NULL,
  deleted_by integer
);

CREATE TABLE IF NOT EXISTS sections (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR (127) NOT NULL,
  description VARCHAR (255),

  order_num integer,

  project_id integer NOT NULL,

  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  deleted_at TIMESTAMPTZ,

  created_by integer NOT NULL,
  updated_by integer NOT NULL,
  deleted_by integer
);

/* ALTER TABLE sections ADD CONSTRAINT fk_section_project FOREIGN KEY (project_id) REFERENCES projects (id); */

ALTER TABLE projects ADD CONSTRAINT fk_projects_user foreign key (owner_id) REFERENCES users (id);
