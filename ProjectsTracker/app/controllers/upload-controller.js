"use strict"

module.exports = function(server, data){
  return {
      singleUpload(req, res, next) {
        let id = req.user._id;
        req.user.imagePath = req.file.destination + req.file.filename + ".png";
        let imageUser = req.user.imagePath;
        req.user.imagePath = imageUser;
        req.user.save((err, user)=> {
          console.log(req.user.imagePath);
        });

        res.redirect('/profile');
      },
      multipleUpload(req, res, next) {
        console.log(req.file);
          res.redirect('/');
      }
    }
};
