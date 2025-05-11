import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link, useSearchParams } from "react-router-dom";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const orderDate = searchParams.get("orderDate");
  const total = searchParams.get("total");
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="max-w-lg w-full">
        <CardHeader>
          <h2 className="text-2xl font-semibold text-center text-green-600">
            Payment Successful!
          </h2>
        </CardHeader>
        <CardContent>
          <p className="text-center text-lg text-gray-700">
            Thank you for completing your payment successfully. Your order will
            be processed shortly.
          </p>
          <div className="mt-4 text-center text-gray-600">
            <p>Order Details:</p>
            <ul>
              <li>Order ID: #{orderId}</li>
              <li>Order Date: {orderDate}</li>
              <li>Total Amount: ${total}</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center flex-col sm:flex-row gap-3 sm:gap-2">
          <Button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
            <Link to="/">Back to Home Page</Link>
          </Button>
          <Button variant="outline" className="bg-green-50 hover:bg-green-500">
            <Link to={`/orders/${orderId}`}>Track your order</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
