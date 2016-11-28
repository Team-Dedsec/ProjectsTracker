"use strict";
let passport = require("passport");

module.exports = function(server, userController){
  server.get('/auth/facebook', passport.authenticate('facebook',{scope: ['email']}));

  server.get("/auth/facebook/return", passport.authenticate("facebook", {
          failureRedirect: '/login'
      }),
      function (req, res) {
          // Successful authentication, redirect home.
          res.redirect("/profile");
      });

  server.get("/auth/github", passport.authenticate("github"));

  server.get("/auth/github/callback", passport.authenticate("github", {
          failureRedirect: "/login"
      }),
      function (req, res) {
          // Successful authentication, redirect home.
          console.log(req.user.username);
          res.redirect("/profile");
      });
};
