"use strict"

module.exports = function(server){
  return {
      singleUpload(req, res, next) {
        console.log(req.user);
        res.redirect('/profile');
      },
      multipleUpload(req, res, next) {
        console.log(req.file);
          res.redirect('/');
      }
    }
};
