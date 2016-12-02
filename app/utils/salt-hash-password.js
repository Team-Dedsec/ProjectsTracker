"use strict";
const crypto = require("crypto");
const constants = require("../constants/constants");

function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length/2))
        .toString("hex")
        .slice(0, length);
}

function getHash(password, salt) {
    let hmac = crypto.createHmac(constants.hashAlgorithm, salt);
    hmac.update(password);
    let value = hmac.digest("hex");
    return value;
}

function saltThenHash(password) {
    let salt = genRandomString(constants.saltLength);
    let value = getHash(password, salt);

    return {
        salt,
        passwordHash: value
    };
}

module.exports.saltThenHash = saltThenHash;
module.exports.getHash = getHash;
module.exports.randomCryptoString = genRandomString;