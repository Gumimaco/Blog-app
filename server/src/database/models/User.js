const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  password: {
    type: mongoose.SchemaTypes.String,
  },
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
  isGoogle: {
    type: mongoose.SchemaTypes.Boolean,
    required: true,
    default: false,
  },
  username: {
    type: mongoose.SchemaTypes.String,
  },
  profile_picture: {
    type: mongoose.SchemaTypes.String,
  },
  description: {
    type: mongoose.SchemaTypes.String,
  },
  isAdmin: {
    type: mongoose.SchemaTypes.Boolean,
    required: true,
    default: false,
  },
  deletedAt: {
    type: mongoose.SchemaTypes.Date,
    required: false,
  },
});
module.exports = mongoose.model("users", UserSchema);
