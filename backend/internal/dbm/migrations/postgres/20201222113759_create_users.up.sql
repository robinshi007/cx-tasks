CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR (127),
  last_name VARCHAR (127),
  user_name VARCHAR (127) UNIQUE NOT NULL,
  email VARCHAR (127) UNIQUE NOT NULL,

  password VARCHAR (127) NOT NULL,
  password_salt VARCHAR(127),
  password_hash_argorithm VARCHAR(127),

  is_active BOOLEAN NOT NULL,

  last_password_change TIMESTAMPTZ NOT NULL,
  last_login TIMESTAMPTZ,
  token VARCHAR (127),

  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  deleted_at TIMESTAMPTZ
);
