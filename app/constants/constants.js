const constants = {
    hashAlgorithm: "sha512",
    saltLength: 16,
    usernameMinLength: 6,
    usernameRegex: /^[A-Za-z0-9_. ]+$/,
    passwordMinLength: 6,
    passwordRegex: /^[A-Za-z0-9_.!@#$%^&*(){}:"<>?~|]+$/,
    passwordResetExpirationInHours: 1,
    passwordResetTokenLength: 50
};

module.exports = constants;