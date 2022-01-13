const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const doctorsSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  postTitle: { type: String },
  phone: {type: String},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

doctorsSchema.pre("save", async function () {
    this.email = this.email.toLowerCase();
    this.password = await bcrypt.hash(this.password, 10);
  });

  module.exports = mongoose.model("Doctor", doctorsSchema);