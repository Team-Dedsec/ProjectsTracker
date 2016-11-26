"use strict";

const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../../models/user-model");

const FACEBOOK_APP_ID = "689681844527052";
const FACEBOOK_APP_SECRET = "0cf13c235108aa1c9158d69914339168";

module.exports = function(passport, data) {
  passport.use(new FacebookStrategy({
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3001/auth/facebook/return"
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({
        facebookId: profile.id
      }, function(err, user) {
        return cb(err, user);
      });
    }
  ));
};
