import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export default async function stripeGateway(req, res, next) {
  try {
    const args = {
      amount: req.body.amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    };
    const paymentIntent = await stripe.paymentIntents.create(args);
    console.log(paymentIntent);
    return res.status(200).json({clientSecret: paymentIntent.client_secret});
  } catch (error) {
    console.log(error);
  }
}
