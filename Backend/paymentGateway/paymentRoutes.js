import express from "express";
import stripeGateway from "./paymentController.js";


const paymentRouter = express.Router();



paymentRouter.post("/create-payment-intent",stripeGateway);


export default paymentRouter;