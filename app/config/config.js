/* eslint-disable no-process-env*/
let path = require("path");
let rootPath = path.normalize(path.join(__dirname, "/../../"));

module.exports = {
    development: {
        rootPath,
        db: {
            local: "mongodb://localhost/Projects",
            cloud: "mongodb://pesho:pesho@ds163667.mlab.com:63667/projects-tracker-db"
        },
        port: process.env.PORT || 3001
    },
    production: {
        rootPath,
        db: { cloud: "mongodb://pesho:pesho@ds163667.mlab.com:63667/projects-tracker-db" },
        port: process.env.PORT || 3001
    },
    mailOptions: {
        service: "SendGrid",
        auth: {
            user: process.env.SENDGRID_USERNAME,
            pass: process.env.SENDGRID_PASSWORD
        }
    }
};
