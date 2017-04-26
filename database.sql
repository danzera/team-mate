-- create "team-mate" database
CREATE DATABASE "team-mate";

-- create "users" table
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(80) NOT NULL UNIQUE,
  "password" VARCHAR(120) NOT NULL,
  "name" VARCHAR(120),
  "phone" VARCHAR(12)
);

-- create "teams" table
CREATE TABLE "teams" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(120) NOT NULL,
  "creator_id" INTEGER NOT NULL REFERENCES "users"
);

-- create "games" table

-- create "users_teams" table

-- create "users_games" table
