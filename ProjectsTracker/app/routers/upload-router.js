const multerFilename = require("../utils/multer-filename-storage");

module.exports = function(server, uploadController) {

  server.get("/profile/uploadfile", function(req, res) {
    res.render("../views/fileUpload.pug", {
      req
    });
  })

  server.post("/profile/uploadfile", multerFilename.single, uploadController.singleUpload);

  //server.post("/photos/upload", multiple, uploadController.multipleUpload);
};
