// External Dependencies :
import express from "express";

// Internal Dependencies :
import CategoryController from "./categoryController.js";



// Category Router :
const categoryRouter = express.Router();


// Instances :
const categoryInstance = new CategoryController();



// Get Category :
categoryRouter.get("/",(req,res,next)=>{
    categoryInstance.getCategory(req,res,next);
})


export default categoryRouter;