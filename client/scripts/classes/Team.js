class Team {
  // base constructor for creating a new Team object
  constructor(id, name, creatorId) {
    this.id = id;
    this.name = name;
    this.creatorId = creatorId;
  }
  // clear all Team properties
  clear() { // appropriate to use this.setProperty('') here instead of directly accessing?
    this.id = '';
    this.name = '';
    this.creatorId = '';
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
  // get creatorId (user id of the user that created the team)
  // matches 'creator_id' in the 'teams' table of the database
  getCreatorId() {
    return this.creatorId;
  }
  // set creatorId (user id of the user that created the team)
  setCreatorId(creatorId) {
    this.creatorId = creatorId;
  }
}
