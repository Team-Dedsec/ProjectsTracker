/* globals require */
"use strict";
const Project = require("../models/project-model");
const data = require("../data")({ Project });
module.exports = {
    viewAllProjects(req, res) {
        if(true) {
            data.getAllProjects().then((projects) => {
                if(true) {
                    res.render("../views/projects.pug", { projects });
                }                
            });
        }
        

    },
    getRegister(req, res) {
        if(!req.isAuthenticated()) {
            res.redirect("/login");
        }
        res.render("../views/create-project.pug", { });
        // data.createProject(req.title, req.leadUser, req.descripion).then(project => res.render("../views/create-project.pug", { project }));
    },
    postProject(req, res) {
        // console.log(req.user);
        let title = req.body.name;
        let description = req.body.description;
        let projectType = req.body.type;
        // let leadUser = req.user._id;
        data.createProject(title, description, projectType).then((project) => {
            res.redirect(`/projects/${project._id}`);
        });
    },
    searchProjects(req, res) {
        data.searchProjects(req.query.s).then(projects => {
            res.render("../views/projects.pug", { projects });
        });
    },
    loadProject(req, res) {
        console.log(req.params.name);
        res.send("<h1>Pesho</h1>");
    },
    getProjectById(req, res) {             
        

        if(!req.isAuthenticated()){
            data.getProjectById(req.params.id).then((project) => {
                if(project.isPrivate == true) {
                    res.redirect("/login");
                }
                res.render("../views/project.pug", project);
            });
        } 
        data.getProjectById(req.params.id).then((project) => {
            res.render("../views/project.pug", project);
        });
        

       // console.log(req.user);
              
        //res.render("../views/project.pug");
    }
};