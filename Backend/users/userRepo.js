import { userModel } from "./userSchema.js";
import Error from "../Error/customError.js";
import bcrypt from "bcrypt";

export default class UserRepo {
  async signup(name, email, password, role) {
    try {
      const newUser = new userModel({
        name,
        email,
        password,
        role
      });

      await newUser.save();

      return newUser;
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new Error(400, error.message);
      }

      if (error.code === 11000) {
        throw new Error(400, "User already exists");
      }

      throw new Error(500, "Something went wrong with the database");
    }
  }

  async signin(email, password) {
    try {
      const valid = await userModel.findOne({ email: email });

      if (!valid) {
        throw new Error(400, "User Not Found");
      }

      const verify = await bcrypt.compare(password, valid.password);

      if (!verify) {
        throw new Error(400, "Invalid Credentials...!");
      }


      return valid;
    } catch (error) {
      if (error.statusCode) {
        throw error;
      }
      throw new Error(500, "Something went wrong with the database");
    }
  }
}
