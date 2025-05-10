import { useAppSelector } from "@/app/hooks";
import CheckoutForm from "@/components/CheckoutForm";
import { Button } from "@/components/ui/button";
import { truncateText } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems } = useAppSelector((state) => state.shoppingCart);
  const [searchParams] = useSearchParams();
  const total = searchParams.get("total");
  const deliveryCost = 16.99;

  const navigate = useNavigate();

  // RENDERs

  const renderOrderItems = cartItems?.map((item) => {
    const { product } = item;
    return (
      <div key={item.id} className="flex items-center justify-between">
        <div className="space-x-2 flex items-center">
          <span className="text-gray-500 text-sm">x{item.quantity}</span>
          <p>{truncateText(product.title, 30)}</p>
        </div>
        <span className="font-medium">
          ${(product.price * item.quantity).toFixed(2)}
        </span>
      </div>
    );
  });

  if (cartItems?.length == 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Your cart is empty!
        </h2>
        <Button variant="destructive">
          <Link to="/products">Browse our products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-12 container">
      <h2 className="text-2xl font-bold mb-5">Complete Your Payment</h2>
      <div className="flex flex-col lg:flex-row gap-5 container px-3 py-5 sm:py-8 sm:px-5">
        <div className="flex-1 lg:flex-2/3 space-y-5 p-3  rounded-md shadow-lg border">
          <div
            className="text-base lg:text-lg font-bold flex items-center cursor-pointer hover:text-destructive transition w-fit"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={"16px"} />
            <span>Back</span>
          </div>
          <CheckoutForm />
        </div>
        <div className="flex-1 lg:flex-1/3 space-y-3 shadow-lg p-3 border rounded-md">
          <h4 className="text-lg font-semibold mb-4">Order Summary</h4>
          <div className="space-y-2">{renderOrderItems}</div>
          <hr />
          <div className="flex items-center justify-between">
            <span>Delivery</span>
            <span>${deliveryCost.toFixed(2)}</span>
          </div>
          <hr />
          <div className="flex items-center justify-between text-primary font-medium">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <hr />
          <div className="flex items-center justify-between font-semibold text-destructive">
            <span>Order Total</span>
            <span>${(+total! + +deliveryCost).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
