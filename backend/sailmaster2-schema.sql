CREATE TABLE users (
  username VARCHAR(25) NOT NULL,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE clubs (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL, 
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip INTEGER NOT NULL,
  lat INTEGER, 
  lon INTEGER,
  tel TEXT NOT NULL,
  url TEXT NOT NULL
);

CREATE TABLE voyage (
  id SERIAL PRIMARY KEY,
  start_point TEXT NOT NULL, 
  end_point TEXT NOT NULL, 
  sailor_username TEXT NOT NULL
);