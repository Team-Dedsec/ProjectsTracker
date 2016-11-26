const Project = require("../models/project-model");
const data = require("../data")({
  Project
});


module.exports = {
    homePage(req, res) {        
        res.render("../views/home-page.pug");        
    }
};
