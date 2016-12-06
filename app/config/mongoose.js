/* globals */
"use strict";
let mongoose = require("mongoose");

module.exports = function(config) {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db.cloud);

    let db = mongoose.connection;

    db.once("open", (err) => {
        if (err) {
            console.log(`Database could not be opened: ${err}`);
        }

        console.log("Database up and running...");
    });

    db.on("error", (err) => {
        console.log(`Database error: ${err}`);
    });
};