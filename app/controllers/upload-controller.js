"use strict";
const path = require("path");
module.exports = function (server, data) {
    return {
        singleUpload(req, res) {
            // let id = req.user._id;
            req.user.imagePath = path.join("../public/uploads", req.file.filename);
            let imageUser = req.user.imagePath;
            req.user.imagePath = imageUser;
            req.user.save((err, user) => {
                console.log(req.user.imagePath);
            });

            res.redirect("/profile");
        },
        multipleUpload(req, res) {
            console.log(req.file);
            res.redirect("/");
        },
        showUploadForm(req, res) {
            res.render("../views/fileUpload.pug", { req });
        }
    };
};