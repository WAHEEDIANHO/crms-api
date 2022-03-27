const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  mobile: { type: Number, required: true, min: 0 },
  address: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  height: { type: Number, required: true, min: 0, max: 8 },
  weight: { type: Number, required: true, min: 0 },
  dob: { type: Date, required: true },
  image: { type: String, required: true },
  admin: { type: Boolean, default: false },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
