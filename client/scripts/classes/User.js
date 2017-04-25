class User {
  constructor(id = -1, email = '', password = '', name = '', phone = '') {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.phone = phone;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email) {
    this.email = email;
  }

  getPassword() {
    return this.password;
  }

  setPassword(password) {
    this.password = password;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getPhone() {
    return this.phone;
  }

  setPhone(phone) {
    this.phone = phone;
  }
}
