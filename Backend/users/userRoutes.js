import express from "express";
import UserController from "./userController.js";


//User Router :
const userRouter = express.Router();

//Instances :
const userController = new UserController();




//Sign - up :
userRouter.post("/signup",(req,res,next)=>{
    userController.signup(req,res,next);
})

//Sign - in :
userRouter.post("/signin",(req,res,next)=>{
    userController.signin(req,res,next);
})

export default userRouter;