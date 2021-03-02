CREATE TABLE IF NOT EXISTS tags (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR (127) NOT NULL,
  description VARCHAR (255),

  scope_type VARCHAR(127) NOT NULL,
  scope_id integer NOT NULL,

  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  deleted_at TIMESTAMPTZ,

  created_by integer NOT NULL,
  updated_by integer NOT NULL,
  deleted_by integer
);

CREATE TABLE IF NOT EXISTS taggings (
  id SERIAL PRIMARY KEY NOT NULL,

  tag_id integer NOT NULL,
  target_type VARCHAR(127) NOT NULL,
  target_id integer NOT NULL,

  order_num integer NOT NULL,

  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  deleted_at TIMESTAMPTZ,

  created_by integer NOT NULL,
  updated_by integer NOT NULL,
  deleted_by integer
);
