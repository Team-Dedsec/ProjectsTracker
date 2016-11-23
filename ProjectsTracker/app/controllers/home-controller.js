const Project = require("../models/project-model");
const data = require("../data")({ Project });


module.exports = {
    index(req, res) {                                
        res.render("../views/index.pug", data.getAllProject);
    }
};