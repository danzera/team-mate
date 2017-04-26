// user class
class User {
  constructor(id, email = '', password = '', firstName = '', lastName = '', phone = '') {
    this.id = id; // user id from the database
    this.email = email; // email === username in the database
    this.password = password; // MAY BE NEEDED LATER TO UPDATE USER PASSWORD
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
  }
  // get the user's ID - matches 'id' in the 'users' table of the database
  getId() {
    return this.id;
  }
  // set the user's ID - used to assign the 'id' that is returned from the database after user is authenticated
  setId(id) {
    this.id = id;
  }
  // get the user's email - matches 'username' in the 'users' table of the database
  getEmail() {
    return this.email;
  }
  // set the user's email - used to assign the user email (username) that is returned from the database after user is authenticated
  setEmail(email) {
    this.email = email;
  }
  // REMOVE? MAY BE NEEDED IN A PASSWORD RESET SITUATION
  getPassword() {
    return this.password;
  }
  // REMOVE? MAY BE NEEDED IN A PASSWORD RESET SITUATION
  setPassword(password) {
    this.password = password;
  }
  // get the user's human name - matches name in the 'users' table of the database
  getName() {
    return this.name;
  }
  // TO BE USED - set a user's name for contact info addition
  setName(name) {
    this.name = name;
  }
  // get the user's phone number - matches 'phone' in the 'users' table of the database
  getPhone() {
    return this.phone;
  }
  // TO BE USED - set a user's phone number for contact info addition
  setPhone(phone) {
    this.phone = phone;
  }
}
