--------CREATE DB & TABLES-------------
-- create "team-mate" database
CREATE DATABASE "team-mate";

-- create "users" table
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(80) NOT NULL UNIQUE,
  "password" VARCHAR(120) NOT NULL,
  "first_name" VARCHAR(120),
  "last_name" VARCHAR(120),
  "phone" VARCHAR(12)
);

-- create "teams" table
CREATE TABLE "teams" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(120) NOT NULL,
  "creator_id" INTEGER NOT NULL REFERENCES "users"
);

-- create "users_teams" table
CREATE TABLE "users_teams" (
"id" SERIAL PRIMARY KEY,
"user_id" INTEGER NOT NULL REFERENCES "users",
"team_id" INTEGER NOT NULL REFERENCES "teams",
"joined" BOOLEAN DEFAULT FALSE,
"manager" BOOLEAN DEFAULT FALSE
);

-- create "games" table
CREATE TABLE "games" (
"id" SERIAL PRIMARY KEY,
"team_id" INTEGER NOT NULL REFERENCES "teams",
"date" DATE NOT NULL,
"time" TIME NOT NULL,
"location" VARCHAR(200) NOT NULL,
"opponent" VARCHAR(120)
);

-- create "users_games" table
CREATE TABLE "users_games" (
  "id" SERIAL PRIMARY KEY,
  "game_id" INTEGER NOT NULL REFERENCES "games",
  "user_id" INTEGER NOT NULL REFERENCES "users",
  "user_status" VARCHAR(20)
);
--------END CREATE DB & TABLES-------------

---------- '/teams' ROUTE ---------------
-- '/teams' POST --
-- called by addNewTeam() in UserService
-- receives teamObject
-- returns ID of the newly created team
INSERT INTO "teams" ("name", "creator_id") VALUES ($1, $2) RETURNING "id"; -- [name, creator_id]

-- '/teams/add-player' POST --
-- called by addPlayerToTeam() in UserService
-- receives userObject
-- nothing returned
INSERT INTO "users_teams" ("user_id", "team_id", "joined", "manager") VALUES ($1, $2, $3, $4); -- [user_id, team_id, joined, manager]
---------- END '/teams' ROUTE ---------------

---------- '/games' ROUTE ---------------
-- '/games' POST --
-- called by addNewGame() in UserService
-- receives gameObject
-- returns ID of the newly created game
INSERT INTO "games" ("team_id", "date", "time", "location", "opponent") VALUES ($1, $2, $3, $4, $5) RETURNING "id"; -- [team_id, date, time, location, opponent]

-- @TODO --ROUTE WORKING-- COME BACK TO THIS WHEN WE COME BACK TO THE TEAM-SCHEDULE BRANCH
-- '/games/:teamId' route
-- get all of a team's games from the "games" table
-- SELECT * FROM "games" WHERE "team_id" = 12 ORDER BY "date";
---------- END '/games' ROUTE ---------------
