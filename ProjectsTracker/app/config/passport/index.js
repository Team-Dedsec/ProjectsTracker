/* globals require */

"use strict";
const User = require("../../models/user-model");
const passport = require("passport");
const data = require("../../data")({ User });

passport.serializeUser((user, done) => {
    console.log("serialize");
    console.log(user);
    if (user) {
        done(null, user.id);
    }
});

passport.deserializeUser((userId, done) => {
    console.log("deserialize");
    console.log(userId);
    data
      .findUserById(userId)
      .then(user => done(null, user || false))
      .catch(error => done(error, false));
});

require("./facebook-strategy")(passport, data);
require("./local-strategy")(passport, data);
require("./github-strategy")(passport, data);

module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());
};
