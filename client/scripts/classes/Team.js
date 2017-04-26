class Team {
  // base constructor for creating a new Team object
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  // get team id
  getId() {
    return this.id;
  }
  // set team id
  // assigns 'id' that is returned from the database
  setId(id) {
    this.id = id;
  }
  // get team name - matches 'name' in the 'teams' table of the database
  getName() {
    return this.name;
  }
  // set team name
  setName(name) {
    this.name = name;
  }
}
