/* mongoose global */
"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const constants = require("../config/constants");
const passHasher = require("../utils/salt-hash-password");

let UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        index: { unique: true },
        validate: {
            validator: (v) => {
                return constants.usernameRegex.test(v) && v.length >= constants.usernameMinLength;
            },
            message: "{VALUE} is not a valid username!"
        }
    },
    passHash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return v.length === constants.saltLength;
            },
            message: "{VALUE} is not a valid salt!"
        }
    },
    // TODO: Define roles & role management strategy
    role: { type: Number },
    projectWorkingOnId: { type: Schema.Types.ObjectId },
    bugWorkingOnId: { type: Schema.Types.ObjectId }
});

UserSchema
    .virtual("fullName")
    .get(function () {
        // noinspection Eslint - mongoose is messing with eslint
        return `${this.firstName} ${this.lastName}`;
    });

UserSchema.query.byName = function (name) {
    return this.find({ username: name });
};

UserSchema.methods.comparePassword = function (password) {
    return this.passHash === passHasher.getHash(password, this.salt);
};

// TODO: Better way/spot to validate
UserSchema.statics.validatePassword = function (password) {
    if (password.length < constants.passwordMinLength || !constants.passwordRegex.test(password)) {
        throw new Error("Invalid user password!");
    }
};

UserSchema.statics.generateHash = function (password) {
    return passHasher.saltThenHash(password);
};


let User;
mongoose.model("User", UserSchema);
User = mongoose.model("User");
module.exports = User;