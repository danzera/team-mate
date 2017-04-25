-- create DB named team-tracker

-- create "users" table
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(80) NOT NULL,
  "password" VARCHAR(120) NOT NULL,
  "name" VARCHAR(120),
  "phone" VARCHAR(12)
);

-- create "teams" table

-- create "games" table

-- create "users_teams" table

-- create "users_games" table
