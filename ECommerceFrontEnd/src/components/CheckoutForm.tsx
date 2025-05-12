import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CookieService from "@/services/CookieService";
import { StripeCardElement } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutFormSchema } from "@/validation";
import * as yup from "yup";
import { Loader2 } from "lucide-react";
import { useAddOrderMutation } from "@/app/services/OrderSlice";
import { useAppDispatch } from "@/app/hooks";
import { setCartItems } from "@/app/features/ShoppingCartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type FormValues = yup.InferType<typeof checkoutFormSchema>;
interface ICheckoutForm {
  amount: number;
}
const CheckoutForm = ({ amount }: ICheckoutForm) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const token = CookieService.get("token");
  const [loading, setLoading] = useState(false);
  const [addOrder] = useAddOrderMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(checkoutFormSchema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);

      const { error, data: orderData } = await addOrder(values);

      if (error) {
        return;
      }

      if (!stripe || !elements) return;

      const response = await fetch(
        "http://127.0.0.1:8000/api/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: amount * 100 }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const resultData = await response.json();
      const clientSecret = resultData.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement) as StripeCardElement,
          billing_details: {
            phone: values.phone,
            address: {
              line1: values.address,
            },
          },
        },
      });

      if (result.error) {
        setMessage(result.error.message || "Something went wrong");
      } else if (result.paymentIntent?.status === "succeeded") {
        dispatch(setCartItems(orderData.cart));
        toast.success("Order completed successfully");
        setTimeout(() => {
          const latestOrder = orderData.order[orderData.order.length - 1];
          navigate(
            `/payment-confirm?total=${latestOrder.total_price}&orderId=${
              latestOrder.id
            }&orderDate=${new Date(
              latestOrder.created_at as string
            ).toLocaleDateString()}`
          );
        }, 500);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setMessage(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full">
        <div className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Enter your phone number"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Enter your address"
                {...register("address")}
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address.message}</p>
              )}
            </div>

            {/* Card Element */}
            <div className="space-y-2">
              <Label>Card Details</Label>
              <div className="border rounded-md p-3">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#1f2937",
                        "::placeholder": {
                          color: "#9ca3af",
                        },
                      },
                      invalid: {
                        color: "#ef4444",
                      },
                    },
                  }}
                />
              </div>
            </div>

            {message && (
              <div className="text-sm text-center text-red-500">{message}</div>
            )}

            <Button type="submit" className="w-full" disabled={!stripe}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Please wait
                </>
              ) : (
                "Pay"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
