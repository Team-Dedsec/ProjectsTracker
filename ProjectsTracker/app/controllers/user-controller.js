"use strict";

const User = require("../models/user-model");
const data = require("../data")({
  User
});
const passport = require("passport");

module.exports = {
  viewAllUsers(req, res) {
    data.getAllUsers().then(users => res.render("../views/users.pug", {
      users
    }));
  },
  viewUserByName(req, res) {
    data.findUserByUsername(req.params.name.toLowerCase())
      .then(foundUsers => {
        let user = foundUsers[0];
        res.render("../views/user-details.pug", {
          user
        });
      });
  },
  registerPage(req, res) {
    res.render("../views/register.pug");
  },
  // register(req, res) {
  //     res.render("../views/register.pug");
  // },
  login(req, res) {
    res.render("../views/login.pug");
  },
  createUser(req, res) {
    let {
      firstName,
      lastName,
      username,
      password
    } = req.body;

    return data.registerUser(firstName, lastName, username.toLowerCase(), password)
      .then(user => {
        return res.redirect(`/user/${user.username}`);
      })
      .catch(err => {
        res.status(400)
          .send(err);
      });
  },
  loginLocal(req, res, next) {
    console.log(req.body);
    const auth = passport.authenticate("local", (error, user) => {
      if (error) {
        next(error);
        return;
      }
      console.log("login local");
      console.log(user);
      if (!user) {
        res.json({
          success: false,
          message: 'Invalid name or password!'
        });
      }

      req.login(user, error => {
        if (error) {
          next(error);
          return;
        }

        res.redirect('/profile');

      });
    });

    auth(req, res, next);
  },
  getProfile(req, res) {
    if (!req.isAuthenticated()) {
      res.status(401).redirect("/unauthorized");
    } else {
      const user = req.user;
      //res.status(200).send(`Welcome, ${user}! Go to <a href="/">Home</a>`);
      req.flash('success_msg', "You have logged in successfully!");
      res.render("../views/profile", {
        user,
        success_msg: req.flash('success_msg')
      });
    }
  },
  get404(req, res) {
    res.send("Unauthorized access");
  }
};
