const User = require("../models/user-model");
const data = require("../data")({ User });

module.exports = {
  viewAllUsers(req, res) {
    data.getAllUsers().then(users => res.render("../views/users.pug", {users}));
  },
  register(req, res){

  }
};
