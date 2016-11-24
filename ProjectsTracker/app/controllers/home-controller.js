const Project = require("../models/project-model");
const data = require("../data")({ Project });


module.exports = {
    index(req, res) {     
        data.getAllProjects().then(projects => res.render("../views/index.pug", { projects }));        
    }
    // getProjectByTitle(req, res) {
    //     data.getProjectById("58334d6b40d7d934243bb133").then((projects) => { console.log(projects) }); //res.render("../views/test.pug", { projects }));
    // }

};
