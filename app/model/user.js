
const emailValidator = require('email-validator');
const sequelize = require('sequelize');
const DBConnection = require('../dbConnection');

class User extends sequelize.Model {

  getEmail() {
    return this.email;
  };

  setEmail(value) {
    // format d'un email : user@domain.ext
    // Affin de vérifier que l'email est au bon format, on ne réinvente pas la roue et on utilise un module specifique pour exécuter cette tâche -> email-validator
    if (!emailValidator.validate(value)) {
      throw Error('User.email must be a valid email!');
    }
    this.email = value;
  }

  getPassword() {
    return this.password;
  };

  setPassword(value) {
    if (typeof value !== "string") {
      throw Error('User.password must be a string');
    } else {
      this.password = value;
    }
  };

  getFirstName() {
    return this.firstname;
  };

  setFirstName(value) {
    if (typeof value !== "string") {
      throw Error('User.firstname must be a string');
    } else {
      this.firstname = value;
    }
  };

  getLastName() {
    return this.lastname;
  };

  setLastName(value) {
    if (typeof value !== "string") {
      throw Error('User.firstname must be a string');
    } else {
      this.lastname = value;
    }
  };

  getStatus() {
      return this.status;
  };

  setStatus(value) {
      if (!Number.isInteger(value)) {
          throw Error('Level.status must be an integer');
      }
      this.status = value;
  };

  getFullName(){
    return this.firstname + ' ' + this.lastname;
  }

};

User.init(
  {
      email: sequelize.STRING,
      password: sequelize.STRING,
      firstname: sequelize.STRING,
      lastname: sequelize.STRING,
      status: sequelize.INTEGER
  },
  {
      sequelize: DBConnection,
      tableName: "app_users",
      createdAt: "created_at",
      updatedAt: "updated_at"
  }
);
module.exports = User;