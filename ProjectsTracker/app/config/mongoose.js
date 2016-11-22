/* globals */
"use strict";

let config = require("./config");

module.exports = function(mongoose) {
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/Projects");
   
    //mongoose.connect(config.db);
};
