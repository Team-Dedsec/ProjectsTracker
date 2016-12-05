"use strict";
const path = require("path");
module.exports = function () {
    return {
        singleUpload(req, res) {
            req.user.imagePath = path.join("../public/uploads", req.file.filename);
            let imageUser = req.user.imagePath;
            req.user.imagePath = imageUser;
            req.user.save(() => {
                console.log(req.user.imagePath);
            });

            res.redirect("/profile");
        },
        multipleUpload(req, res) {
            res.redirect("/");
        },
        showUploadForm(req, res) {
            res.render("../views/fileUpload.pug", { req });
        }
    };
};