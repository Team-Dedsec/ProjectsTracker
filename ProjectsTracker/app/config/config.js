let path = require("path");
let rootPath = path.normalize(path.join(__dirname, "/../../"));

module.exports = {
    development: {
        rootPath: rootPath,
        db: {
            local: "mongodb://localhost/Projects",
            cloud: "mongodb://pesho:pesho@ds163667.mlab.com:63667/projects-tracker-db"
        },
        port: process.env.PORT || 3001
    },
    mailOptions: {
        service: "SendGrid",
        auth: {
            user: "TeamDedSec",
            pass: "Itsareallysecurepasswordwhichshouldcomefromconfig1"
        }
    }
};
