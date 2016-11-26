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
      callbackURL: "http://localhost:3001/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({
        githubId: profile.id
      }, function(err, user) {
        return cb(err, user);
      });
    }
  ));
};
