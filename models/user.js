const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Admin", "Company", "User"],
    default: "User",
  },
});

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   name: { type: String, required: true },
//   age: { type: Number, required: true },
//   birthdate: { type: Date, default: Date.now },
//   isActive: { type: Boolean, default: true },
//   skills: { type: [String] },  // Array of Strings
//   profileImage: { type: Buffer },  // Binary Data (Image)
//   friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]  // Array of ObjectIds for relationships
// });

// const User = mongoose.model('User', userSchema);

module.exports = mongoose.model("User", UserSchema);
