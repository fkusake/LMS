import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Error from "../Error/customError.js";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters"],
  },
  role: {
    type: String,
    required:true
  },
});

//Pre - Hook :
userSchema.pre("save", async function () {
  try {
    if (!this.isModified("password")) {
      return;
    }
    const newPass = await bcrypt.hash(this.password, 10);
    this.password = newPass;
  } catch (error) {
    throw new Error(500, "Something went wrong");
  }
});


// Dev Code :
userSchema.pre("insertMany", async function (docs) {
  try {
    for (let doc of docs) {
      if (doc.password) {
        doc.password = await bcrypt.hash(doc.password, 10);
      }
    }
  } catch (err) {
    console.log(err);
  }
});


export const userModel = mongoose.model("users", userSchema);
