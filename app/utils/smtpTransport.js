"use strict";
const nodemailer = require("nodemailer");
const smtpOptions = require("../config/config").mailOptions;

const smtpTransport = nodemailer.createTransport("SMTP", smtpOptions);

module.exports = {
    sendMail(options) {
        return new Promise((resolve, reject) => {
            smtpTransport.sendMail(options, (err) => {
                if (err) {
                    reject(err);
                }

                resolve(options);
            });
        });
    }
};