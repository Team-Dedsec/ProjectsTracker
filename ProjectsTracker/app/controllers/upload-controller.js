"use strict";
const path = require("path");
module.exports = function (server, data) {
    return {
        singleUpload(req, res, next) {
            // let id = req.user._id;
            req.user.imagePath = path.join("../public/uploads", req.file.filename);
            let imageUser = req.user.imagePath;
            req.user.imagePath = imageUser;
            req.user.save((err, user) => {
                console.log(req.user.imagePath);
            });

            res.redirect("/profile");

        },
        multipleUpload(req, res, next) {
            console.log(req.file);
            res.redirect("/");
        },
        showUploadForm(req, res) {
            if (req.isAuthenticated()) {
                res.render("../views/fileUpload.pug", { req });
            } else {
                req.flash("error_msg", "You must be logged in to do that!");
                res.redirect("/login");
            }
        }
    };
};