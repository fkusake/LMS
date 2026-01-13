import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useEffect, useState } from "react";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const amount = 899;

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#0d6efd",
      borderRadius: "8px",
    },
  };

  useEffect(() => {
    async function initiateIntent() {
      const res = await axios.post(
        "http://localhost:3000/api/payments/create-payment-intent",
        { amount }
      );
      setClientSecret(res.data.clientSecret);
    }
    initiateIntent();
  }, []);

  if (!clientSecret) return <p>Loading payment...</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      <CheckoutForm />
    </Elements>
  );
}
