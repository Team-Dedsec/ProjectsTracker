let multer = require("multer");

let upload = multer({dest:"../../public/uploads/"});

let single = upload.single("photo");
let multiple = upload.array("photos", 12);

module.exports = function(server, uploadController) {

    server.get("/profile/uploadfile", function(req, res) {
        res.render("../views/fileUpload.pug", { req });
    })

    server.post("/profile/uploadfile", single, uploadController.singleUpload);

    //server.post("/photos/upload", multiple, uploadController.multipleUpload);
};
