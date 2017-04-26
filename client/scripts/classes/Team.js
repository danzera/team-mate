class Team {
  // base constructor for creating a new Team object
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  // get the team's id
  getId() {
    return this.id;
  }
  // set the team's id
  setId(id) {
    this.id = id;
  }
  // get the team's name
  getName() {
    return this.name;
  }
  // set the team's name
  setName(name) {
    this.name = name;
  }
}
