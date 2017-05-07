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
  "manager" BOOLEAN DEFAULT FALSE
);
--------END CREATE DB & TABLES-------------


---------- '/teams' ROUTE ---------------
-- '/teams' GET
-- called by getUsersTeams() in UserService
-- returns team info for teams a user is associated with in the users_teams table
SELECT "team_id", "name", "manager" FROM "teams" JOIN "users_teams" ON "teams"."id" = "users_teams"."team_id" WHERE "users_teams"."user_id" = $1; -- [req.user.id]

-- '/teams' POST --
-- called by addNewTeam() in UserService
-- receives teamObject
-- returns ID of the newly created team
INSERT INTO "teams" ("name", "creator_id") VALUES ($1, $2) RETURNING "id"; -- [name, creator_id]

-- '/teams/add-player' POST
-- called by addPlayerToTeam() in UserService
-- receives inviteObject
-- nothing returned
INSERT INTO "users_teams" ("user_id", "team_id", "manager") VALUES ($1, $2, $3); -- [req.user.id, team_id, manager]
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
-- '/invite' GET
-- called by getUsersInvites() in UserService
-- returns all invites from the "invites" table for the current user

SELECT "team_id", "name", "manager" FROM "invites" JOIN "teams" ON "invites"."team_id" = "teams"."id" WHERE "invites"."email" = $1; -- [req.user.username]
-- '/invite' POST --
-- called by invitePlayer() in UserService
-- receives inviteObject
INSERT INTO "invites" ("invite_team_id", "email", "invite_is_manager") VALUES ($1, $2, $3); -- [invite_team_id, email, invite_is_manager]

-- '/invite/:teamId' DELETE --
-- called by acceptInvite() in UserService
-- deletes invites corresponding to the current user and the provided teamId
DELETE FROM "invites" WHERE ("team_id", "email") = ($1, $2); -- [team_id, req.user.username]

---------- END '/invite' ROUTE ---------------