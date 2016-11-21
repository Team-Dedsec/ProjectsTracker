/* mongoose global */
"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Username: {
    type: String,
    required: true,
    index: {
      unique: true
    },
      validate: {
          validator: (v) => {
              return /[A-Za-z0-9]{6}/.test(v);
      },
      message: '{VALUE} is not a valid username!'
    },
  },
  Password: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /[A-Za-z0-9]{8}/.test(v);
      },
      message: '{VALUE} is not a valid password!'
    },
  },
  Role: {
    type: Number
  },
  ProjectWorkingOnId: {
    type: Number
  },
  BugWorkingOnId: {
    type: Number
  }
});

UserSchema
.virtual('FullName')
.get(function () {
  return this.FirstName + ' ' + this.LastName;
});

UserSchema.query.byName = function(name) {
  return this.find({ Username: name});
};

UserSchema.query.byId = function(id) {
  return this.findById(id);
};

let User;
mongoose.model("User", UserSchema);
User = mongoose.model("User");
module.exports = User;
