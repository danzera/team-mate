class Game {
  // base constructor for creating a new Team object
  constructor(id, teamId, date, time, location, opponent) {
    this.id = id;
    this.teamId= teamId;
    this.date = date;
    this.time = time;
    this.location = location;
    this.opponent = opponent;
  }
  // clear all Game properties
  clear() {
    this.id = '';
    this.teamId= '';
    this.date = '';
    this.time = '';
    this.location = '';
    this.opponent = '';
  }
  getId() {
    return this.id;
  }
  setId(id) {
    this.id = id;
  }
  getTeamId() {
    return this.teamId;
  }
  setTeamId(teamId) {
    this.teamId = teamId;
  }
  getDate() {
    return this.date;
  }
  setDate(date) {
    this.date = date;
  }
  getTime() {
    return this.time;
  }
  setTime(time) {
    this.time = time;
  }
  getLocation() {
    return this.location;
  }
  setLocation(location) {
    this.location = location;
  }
  getOpponent() {
    return this.opponent;
  }
  setOpponent(opponent) {
    this.opponent = opponent;
  }
}
