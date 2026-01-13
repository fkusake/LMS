// External Dependencies :
import express from "express";
const server = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";



//Internal Dependencies :
import userRouter from "./users/userRoutes.js";
import categoryRouter from "./category/categoryRoutes.js";
import courseRouter from "./course/courseRoutes.js";
import db from "./dbConfig/config.js";
import jwtAuth from "./middlewares/auth.js";
import seedData from "./Data/seeder.js";
import paymentRouter from "./paymentGateway/paymentRoutes.js";
import path from "path";
import { fileURLToPath } from "url";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Application Level Middleware :
server.use(cors());
server.use(express.json());

//Routes : 
server.use("/api/users",userRouter);
server.use("/api/courses",courseRouter);
server.use("/api/category",categoryRouter);
server.use("/api/payments",paymentRouter);
server.use("/public", express.static(path.join(__dirname, "public")));



server.get("/",(req,res,next)=>{
    return res.send("Hello world");
})

server.post("/seedData",seedData);


//Error Middleware :
server.use((error,req,res,next)=>{
    if(error.statusCode){
        return res.status(error.statusCode).json({message:error.message});
    }
    return res.status(500).json({message:"Something went wrong...!!!"});
})


let port = process.env.PORT || 3002;
// Server is Listening : 
server.listen(Number(port),()=>{
    db();
    console.log(`Server is listening to the port number ${port}`);
})