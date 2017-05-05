--------CREATE DB & TABLES-------------
-- create "team-mate" database
CREATE DATABASE "team-mate";

-- create "users" table
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(120) NOT NULL UNIQUE,
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

-- create "invites" table
CREATE TABLE "invites" (
  "id" SERIAL PRIMARY KEY,
  "team_id" INTEGER REFERENCES "teams",
  "email" VARCHAR(120),
  "manager" VARCHAR(20)
);
--------END CREATE DB & TABLES-------------


---------- '/teams' ROUTE ---------------
-- '/teams/:userId' GET
-- called by getUsersTeams() in UserService
-- receives req.params ^
-- returns all team info for teams a user is associated with in the users_teams table
SELECT * FROM "teams" JOIN "users_teams" ON "teams"."id" = "users_teams"."team_id" WHERE "users_teams"."user_id" = $1; -- [user_id]

-- '/teams' POST --
-- called by addNewTeam() in UserService
-- receives teamObject
-- returns ID of the newly created team
INSERT INTO "teams" ("name", "creator_id") VALUES ($1, $2) RETURNING "id"; -- [name, creator_id]

-- '/teams/add-player/:teamId/:userId' POST
-- called by addPlayerToTeam() in UserService
-- receives req.params ^ & playerStatusObject
-- nothing returned
INSERT INTO "users_teams" ("user_id", "team_id", "joined", "manager") VALUES ($1, $2, $3, $4); -- [user_id, team_id, joined, manager]
---------- END '/teams' ROUTE ---------------


---------- '/games' ROUTE ---------------
-- '/games/:teamId' GET
-- called by getTeamsGames() in UserService
-- receives req.params ^
-- returns all games from the "games" table for the specified teamId
SELECT * FROM "games" WHERE "team_id" = $1 ORDER BY "date"; -- [team_id]

-- '/games' POST --
-- called by addNewGame() in UserService
-- receives gameObject
-- returns ID of the newly created game
INSERT INTO "games" ("team_id", "date", "time", "location", "opponent") VALUES ($1, $2, $3, $4, $5) RETURNING "id"; -- [team_id, date, time, location, opponent]
---------- END '/games' ROUTE ---------------


---------- '/invite' ROUTE ---------------
-- '/invite' POST --
-- called by invitePlayer() in UserService
-- receives inviteObject
-- nothing returned
INSERT INTO "invites" ("invite_team_id", "email", "invite_is_manager") VALUES ($1, $2, $3); -- [invite_team_id, email, invite_is_manager]
---------- END '/invite' ROUTE ---------------