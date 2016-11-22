"use strict";

const Strategy = require("passport-facebook").Strategy;
const passport = require("passport");

const FACEBOOK_APP_ID = "689681844527052";
const FACEBOOK_APP_SECRET = "0cf13c235108aa1c9158d69914339168";

module.exports = passport.use(new Strategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/return"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
