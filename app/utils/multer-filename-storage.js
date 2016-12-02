"use strict";
const path = require("path");
const crypto = require("crypto");
const fileDirectory = path.join(__dirname, "../../public/uploads/");
let multer = require("multer");

let storage = multer.diskStorage({
    destination: fileDirectory,
    filename: (req, file, done) => {
        crypto.pseudoRandomBytes(16, (err, raw) => {
            if (err) {
                return done(err);
            }

            done(null, raw.toString("hex") + path.extname(file.originalname));
        });
    }
});

let upload = multer({ dest: fileDirectory, storage });

module.exports = {
    single: upload.single("photo"),
    multiple: upload.array("photos", 12)
};