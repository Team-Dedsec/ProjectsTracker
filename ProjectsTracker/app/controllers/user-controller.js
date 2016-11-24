

module.exports = function(data) {
  return {
    register(req, res) {
      let body = req.body;
      data.registerUser(body.firstName, body.lastName, body.username, body.password)
        .then(() => {
          res.redirect("../views/index.pug", {title: "Registration"});
        });
    },
    getByUsername(req, res) {
      data.findUserByUsername(req.params.username)
        .then(user => {
          if (user === null) {
            return res.status(404)
              .redirect("/error");
          }

          return res.render("user/info", {
            result: user
          });
        });
    },
    getById(req, res) {
      console.log(req.params.id);
      data.findUserById(req.params.id)
        .then(user => {
          if (user === null) {
            return res.status(404)
              .redirect("/error");
          }

          return res.render("user/details", {
            result: user
          });
        });
    }
  };
};
