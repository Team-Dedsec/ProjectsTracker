/* globals require */

"use strict";
const User = require("../../models/user-model");
const passport = require("passport");
const data = require("../../data")({ User });

passport.serializeUser((user, done) => {
    if (user) {
        done(null, user.id);
    }
});

passport.deserializeUser((userId, done) => {
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