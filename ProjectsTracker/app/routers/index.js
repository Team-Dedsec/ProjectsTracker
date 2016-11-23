'use strict';

const fs = require("fs"),
    path = require("path");

module.exports = function (server) {
    fs.readdirSync(__dirname)
      .filter(fileName => fileName.indexOf('-router') !== -1)
      .forEach((routerName) => {          
          const router = require(path.join(__dirname, '/' + routerName));
          
          router(server);
      });


    //can be implemented error pages
    //const errorsRouter = require(path.join(__dirname, './errors'));

    //errorsRouter(server);
}