import { FormEvent, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CookieService from "@/services/CookieService";
import { StripeCardElement, StripeCardNumberElement } from "@stripe/stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const token = CookieService.get("token");
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/api/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: 100 }), // $1.00
      }
    );

    const data = await response.json();
    const clientSecret = data.clientSecret;

    // 2. تنفيذ الدفع
    const result = await stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements?.getElement(CardElement) as
          | StripeCardElement
          | StripeCardNumberElement,
      },
    });

    if (result?.error) {
      setMessage(`${result.error.message}`);
    } else {
      if (result?.paymentIntent.status === "succeeded") {
        setMessage("✅ Payment successful!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      <p>{message}</p>
    </form>
  );
};

export default CheckoutForm;
