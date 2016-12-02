/* globals module require __dirname */

const path = require("path");
const fs = require("fs");

module.exports = function(data) {
    let controller = {};

    fs.readdirSync(__dirname)
        .filter(file => file.includes("-controller"))
        .forEach(file => {
            let dataModule = require(path.join(__dirname, file))(data);
            Object.keys(dataModule)
                .forEach(key => {
                    controller[key] = dataModule[key];
                });
        });
    return controller;
};