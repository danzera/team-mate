// user class
class User {
  constructor(id, username = '', firstName = '', lastName = '', phone = '', currentTeam = '', hasJoined = false, isManager = false) {
    this.id = id; // user id from the database
    this.username = username; // username === username in the database
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.currentTeam = currentTeam;
    this.hasJoined = hasJoined;
    this.isManager = isManager;
  }
  // clear all User properties
  clear() { // appropriate to use this.setProperty('') here instead of directly accessing?
    this.id = '';
    this.username = '';
    this.firstName = '';
    this.lastName = '';
    this.phone = '';
    this.currentTeam = '';
    this.hasJoined = false;
    this.isManager = false;
  }
  // get the user's ID - matches 'id' in the 'users' table of the database
  getId() {
    return this.id;
  }
  // set the user's ID - used to assign the 'id' that is returned from the database after user is authenticated
  setId(id) {
    this.id = id;
  }
  // get the user's username - matches 'username' in the 'users' table of the database
  getUsername() {
    return this.username;
  }
  // set the user's username - used to assign the user username (username) that is returned from the database after user is authenticated
  setUsername(username) {
    this.username = username;
  }
  // get the user's first name - matches first_name in the 'users' table of the database
  getFirstName() {
    return this.firstName;
  }
  // TO BE USED - set a user's first name for contact info addition
  setFirstName(first) {
    this.firstName = first;
  }
  // get the user's last name - matches last_name in the 'users' table of the database
  getLastName() {
    return this.lastName;
  }
  // TO BE USED - set a user's first name for contact info addition
  setLastName(last) {
    this.lastName = last;
  }
  // get the user's phone number - matches 'phone' in the 'users' table of the database
  getPhone() {
    return this.phone;
  }
  // TO BE USED - set a user's phone number for contact info addition
  setPhone(phone) {
    this.phone = phone;
  }
  // get the user's currentTeam ID
  getCurrentTeam() {
    return this.currentTeam;
  }
  // set the user's currentTeam ID
  setCurrentTeam(teamId) {
    this.currentTeam = teamId;
  }
  // get the user's username - matches 'username' in the 'users' table of the database
  getHasJoined() {
    return this.hasJoined;
  }
  // set the user's username - used to assign the user username (username) that is returned from the database after user is authenticated
  setHasJoined(hasJoined) {
    this.hasJoined = hasJoined;
  }
  // get the user's manager status for their currentTeam
  getIsManager() {
    return this.isManager;
  }
  // set the user's manager status for their currentTeam
  setIsManager(isManager) {
    this.isManager = isManager;
  }
}
