import UserRepo from "./userRepo.js";
import jwt from "jsonwebtoken";

export default class UserController {
  constructor() {
    this.userRepo = new UserRepo();
  }

  async signup(req, res, next) {
    try {
      let { name, email, password , role} = req.body;
      if(Number(role) ===  2883){
        role = "instructor"
      }else if(role === ""){
        role = "student"
      }else{
        return res.status(400).json({result:"Invalid Code"});
      }
      const result = await this.userRepo.signup(name, email, password, role);
      return res.status(201).json({ result: result });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await this.userRepo.signin(email,password);
      const jwtCode = jwt.sign(
        { userId: result._id, role: result.role },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      return res.status(200).json({userName: result.name,userRole: result.role, userEmail:result.email, userId:result._id, signCode : jwtCode});
    } catch (error) {
      next(error);
    }
  }
}
