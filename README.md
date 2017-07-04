# TeamMate - Prime Academy Solo Project
1. TeamMate is a full stack web application that automates the otherwise largely manual process of running a sports team.
2. Managers are able to create a team, set their team’s schedule and invite players to join. Players are then able to set their availability on a game-by-game basis.
3. Automated e-mails are sent to players 3 days prior to scheduled games, as a reminder. Subsequent e-mails are also sent to players who, much to the chagrin of their manager, have been reluctant to set their game availability.
4. Technologies used: SQL, PostrgreSQL, AngularJS, JavaScript, Node.js, Express.js, Passport, HTML5, CSS3, Bootstrap, Nodemailer, Grunt, Heroku, Git, GitHub

### Prerequisites

You will need to have the following software installed.

[Node.js](https://nodejs.org/en/)
[PostgreSql](https://launchschool.com/blog/how-to-install-postgresql-on-a-mac)
[Postico](https://eggerapps.at/postico/)

### Installing

Steps to get the development environment running.

1. Clone the repository to your local machine.

```
git clone https://github.com/danzera/team-mate.git
```

2. Install all dependencies.

```
npm install
```

3. Ensure PostgreSql is running.

```
brew services start postgresql
```

4. Start Grunt.

```
grunt
```

5. Spin up the Server.

```
npm start
```

6. Open in the browser.

```
localhost:5000
```
