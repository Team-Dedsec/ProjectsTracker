const multerFilename = require("../utils/multer-filename-storage");

module.exports = function (server, uploadController, isAuthenticated) {
    server.get("/profile/uploadfile", isAuthenticated, uploadController.showUploadForm);
    server.post("/profile/uploadfile", isAuthenticated, multerFilename.single, uploadController.singleUpload);
};
