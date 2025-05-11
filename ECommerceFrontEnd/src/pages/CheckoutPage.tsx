import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ADDRESS_INPUTS } from "@/data";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "@/validation";
import { useAppSelector } from "@/app/hooks";
import { calcTotalPrice } from "@/utils";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CookieService from "@/services/CookieService";

type Inputs = {
  country: string;
  city: string;
  street: string;
  postalCode: string;
  creditNumber: string;
  expiry: string;
  cvc: string;
};

const CheckoutPage = () => {
  const { cartItems } = useAppSelector((state) => state.shoppingCart);
  const deliveryCost = 16.99;
  const discount = 0;
  const totalPrice = calcTotalPrice(cartItems || []);
  const orderTotalPrice =
    totalPrice - (totalPrice * discount) / 100 + deliveryCost;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(addressSchema),
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => console.log(data);

  // RENDERs
  const renderAddressInputs = ADDRESS_INPUTS.map(
    ({ name, type, placeholder }, idx) => {
      return (
        <div key={idx}>
          <Input type={type} {...register(name)} placeholder={placeholder} />
          {errors[name] && (
            <p className="text-red-500 text-sm">{errors[name]?.message}</p>
          )}
        </div>
      );
    }
  );

  const renderOrderItems = cartItems?.map((item) => {
    return (
      <div key={item.id} className="flex items-center justify-between">
        <div className="space-x-2 flex items-center">
          <span className="text-gray-500 text-sm">x{item.quantity}</span>
          <p>{item.product.title}</p>
        </div>
        <span className="font-medium">
          ${(item.product.price * item.quantity).toFixed(2)}
        </span>
      </div>
    );
  });
  const token = CookieService.get("token");
  return !token ? (
    <div className="flex items-center justify-center mt-12 mx-3">
      <div className="max-w-[400px] border border-primary bg-primary/10 rounded-md shadow-2xl p-4 space-y-3">
        <h3 className="text-base lg:text-lg font-semibold">
          🔒 You must be logged in to complete your checkout. Please log in or
          create an account to proceed with your purchase.
        </h3>
        <Button
          className="w-full bg-primary text-white hover:bg-primary/90"
          onClick={() => navigate("/login")}
        >
          Log In
        </Button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col lg:flex-row gap-5 container mx-auto mt-12 px-3">
      <div className="flex-1 lg:flex-2/3 space-y-5 p-3  rounded-md shadow-lg border">
        <div
          className="text-base lg:text-lg font-bold flex items-center cursor-pointer hover:text-destructive transition w-fit"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={"16px"} />
          <span>Back</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 ">
          {renderAddressInputs}
          <Button type="submit" className="cursor-pointer">
            Confirm Payment
          </Button>
        </form>
      </div>
      <div className="flex-1 lg:flex-1/3 space-y-3 shadow-lg p-3 border rounded-md">
        <h4 className="text-lg font-semibold mb-4">Order Summary</h4>
        <div className="space-y-2">{renderOrderItems}</div>
        <hr />
        <div className="flex items-center justify-between">
          <span>Delivery</span>
          <span>${deliveryCost.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span>${discount.toFixed(2)}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between text-primary font-medium">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between font-semibold text-destructive">
          <span>Order Total</span>
          <span>${orderTotalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
