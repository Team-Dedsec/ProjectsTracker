const User = require("../models/user-model");
const data = require("../data")({ User });

module.exports = {
  viewAllUsers(req, res) {
    data.getAllUsers().then(users => res.render("../views/users.pug", {users}));
  },
  viewUserByName(req, res) {
    data.findUserByUsername(req.params.name).then(user => res.render("../views/user-details.pug", {user}));
  },
  register(req, res) {
    res.render("../views/register.pug");
  },
  login(req, res) {
    res.render("../views/login.pug");
  },
  createUser(req, res){
    let {firstName, lastName, username, password} = req.body;

    return data.registerUser(firstName, lastName, username, password)
    .then(user => {
      return res.redirect("/user-details");
    })
    .catch(err => {
      res.status(400)
      .send(err);
    });
  }
};
