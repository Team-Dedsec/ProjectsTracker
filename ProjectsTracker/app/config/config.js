let path = require("path");
let rootPath = path.normalize(path.join(__dirname, "/../../"));

module.exports = {
    development: {
        rootPath: rootPath,
        db: "mongodb://localhost/Projects",
        port: process.env.PORT || 3000
    }
};