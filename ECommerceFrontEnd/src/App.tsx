import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const App = () => {
  return (
    <main>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router}></RouterProvider>
        <Toaster position="top-center" toastOptions={{ duration: 1400 }} />
      </Elements>
    </main>
  );
};

export default App;
