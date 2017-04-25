class User {
  constructor(email, name = '', phone = '') {
    this.email = email;
    this.name = name;
    this.phone = phone;
  }

  getEmail() {
    return this.email;
  }

  setEmail(email) {
    this.email = email;
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
