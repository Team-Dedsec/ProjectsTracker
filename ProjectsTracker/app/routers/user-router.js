/* globals module require */
const userController = require("../controllers/user-controller");

module.exports = function(server) {
  let passportFacebook = require("../config/facebook-authentication.js");
  let passportGitHub = require("../config/github-authentication.js");
  //let passportLocal = require("../config/local-authentication");

  server.get("/users", userController.viewAllUsers);
  server.get("/user/:name", userController.viewUserByName);
  server.get("/register", userController.registerPage);
  server.post("/register", userController.createUser);

  server.post("/login", userController.loginLocal);

  server.get("/login", userController.login);

  server.get("/login/facebook", passportFacebook.authenticate("facebook"));

  server.get("/auth/facebook/return", passportFacebook.authenticate("facebook", {
      failureRedirect: "/login"
    }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect("/");
    });

  server.get('/login/github', passportGitHub.authenticate('github'));

  server.get('/auth/github/callback', passportGitHub.authenticate('github', {
      failureRedirect: '/login'
    }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

    //server.get("/profile/:username")
  };
