// userModel.js

import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  team: {
    type: String,
    required: false,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  timer: {
    type: Number,
    default: 10000, // 10 Sekunden Timeout als Standard
  },
  tier: {
    type: Number,
    default: 1, // Stufe des Spielers gibt an, welchen bonus er auf timeout erhält
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// Password hashing vor dem Speichern
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
