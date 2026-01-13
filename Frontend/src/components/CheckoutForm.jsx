import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/success",
      },
    });

    if (error) {
      console.error(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h5 className="mb-4 text-center fw-semibold">
                Complete your payment
              </h5>

              <form onSubmit={handleSubmit}>
                <PaymentElement options={{ layout: "tabs" }} />

                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-4"
                  disabled={isLoading || !stripe || !elements}
                >
                  {isLoading ? (
                    <span className="d-flex align-items-center justify-content-center gap-2">
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Processing...
                    </span>
                  ) : (
                    "Pay now"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
