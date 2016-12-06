/* eslint-disable no-process-env*/
let path = require("path");
let rootPath = path.normalize(path.join(__dirname, "/../../"));

module.exports = {
    development: {
        rootPath,
        db: {
            local: "mongodb://localhost/Projects",
            cloud: process.env.DB_CONNECTION
        },
        port: process.env.PORT || 3001
    },
    production: {
        rootPath,
        db: { cloud: process.env.DB_CONNECTION },
        port: process.env.PORT || 3001
    },
    mailOptions: {
        host: "in-v3.mailjet.com",
        port: 587,
        auth: {
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD
        }
    }
};