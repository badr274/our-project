import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetSingleOrderQuery } from "@/app/services/OrderSlice";
import { addDaysToDate } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";

// type status = "pending" | "processing" | "shipped" | "delivered" | "cancelled";
const TrackOrderPage = () => {
  const { orderId } = useParams();
  const { data: orderRes, isLoading } = useGetSingleOrderQuery({
    orderId: Number(orderId),
  });
  const order = orderRes?.order;
  // const statusColor: Record<status, string> = {
  //   pending: "yellow",
  //   processing: "blue",
  //   shipped: "purple",
  //   delivered: "green",
  //   cancelled: "red",
  // };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Track Your Order</h1>
        </CardHeader>
        <CardContent>
          <div className="flex">
            <span className="font-semibold">Order ID:</span>
            {isLoading && <Skeleton className="h-5 w-[20px]" />}
            {!isLoading && `#${order?.id}`}
          </div>
          <div className="flex">
            <span className="font-semibold mr-1 sm:mr-2">Status:</span>
            {isLoading && <Skeleton className="h-6 w-[50px] rounded-lg" />}
            {!isLoading && <Badge>{order?.status}</Badge>}
          </div>
          {order?.status === "shipped" && (
            <div className="flex">
              <span className="font-semibold">Tracking Number:</span>
              {isLoading && <Skeleton className="h-5 w-[100px]" />}
              {!isLoading && "ARX987654321"}
            </div>
          )}
          {order
            ? order?.status !== "pending" && (
                <div className="flex">
                  <span className="font-semibold mr-1 sm:mr-2">
                    Estimated Delivery:
                  </span>
                  {isLoading && <Skeleton className="h-5 w-[120px]" />}
                  {!isLoading && addDaysToDate(order?.created_at, 5)}
                </div>
              )
            : null}
        </CardContent>
        <div className="text-center mt-4">
          <Button size="lg">
            <Link to="/orders">Back to My Orders</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TrackOrderPage;
