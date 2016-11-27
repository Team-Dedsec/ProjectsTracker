/* mongoose global */
"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const constants = require("../constants/constants");
const passHasher = require("../utils/salt-hash-password");
const roles = ["admin", "user"];

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
        index: {
            unique: true
        },
        validate: {
            validator: (v) => {
                return constants.usernameRegex.test(v) && v.length >= constants.usernameMinLength;
            },
            message: "{VALUE} is not a valid username!"
        }
    },
    password: {
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
    role: {
        type: String,
        enum: roles
    },
    projectWorkingOnId: {
        type: Schema.Types.ObjectId, ref: "Project"
    },
    bugWorkingOnId: {
        type: Schema.Types.ObjectId
    }
});

UserSchema
    .virtual("fullName")
    .get(function () {
        // noinspection Eslint - mongoose is messing with eslint
        return `${this.firstName} ${this.lastName}`;
    });

UserSchema.query.byName = function (name) {
    let query = { "username": new RegExp(name, "i") };
    return this.find(query);
};

UserSchema.methods.comparePassword = function (password1) {
    return this.password === passHasher.getHash(password1, this.salt);
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

UserSchema.statics.findOrCreate = function findOrCreate(profile, cb) {
    var userObj = new this();
    this.findOne({
        id: profile.id
    }, function (err, result) {
        if (!result) {
            userObj.username = profile.displayName;
            //....
            userObj.save(cb);
        } else {
            cb(err, result);
        }
    });
};

let User;
mongoose.model("User", UserSchema);
User = mongoose.model("User");
module.exports = User;
