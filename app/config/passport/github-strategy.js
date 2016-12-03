"use strict"

const GitHubStrategy = require("passport-github").Strategy;
const passport = require("passport");
const User = require("../../models/user-model");

const GITHUB_APP_ID = "55c2edeb759e577c87a5";
const GITHUB_APP_SECRET = "37665b312633363404bc52948ab23668cb4eda27";

module.exports = function(passport, data) {
  passport.use(new GitHubStrategy({
      clientID: GITHUB_APP_ID,
      clientSecret: GITHUB_APP_SECRET,
      callbackURL: "https://dedsec.herokuapp.com/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(typeof profile.id);
      User.findOne({
        'githubId': profile.id
      }, function(err, user) {
        if (err)
          return done(err);
        if (user)
          return done(null, user);
        else {
          console.log(profile);
          User.validatePassword(profile.id);
          let passInfo = User.generateHash(profile.id);
          let passHash = passInfo.passwordHash;
          let salt = passInfo.salt;
          let newUser = new User({
            githubId: profile.id,
            username: profile.username,
            firstName: profile.displayName,
            lastName: profile.displayName,
            password: passHash,
            salt: salt,
            email: profile.profileUrl,
            role: "user"
          });
          newUser.save(function(err) {
            if (err){
              console.log(err.message);
            }
            console.log(newUser);
            return done(null, newUser);
          });
        };
      });
    }
  ));
};
