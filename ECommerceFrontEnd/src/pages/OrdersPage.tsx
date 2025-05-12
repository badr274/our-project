import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Link } from "react-router-dom";

import { useGetOrdersQuery } from "@/app/services/OrderSlice";
import CookieService from "@/services/CookieService";
import { Skeleton } from "@/components/ui/skeleton";
const OrdersPage = () => {
  const token = CookieService.get("token");
  // Handle Payment

  const { data: orderRes, isLoading } = useGetOrdersQuery(undefined, {
    skip: !token,
  });
  console.log(orderRes);
  const orders = orderRes?.order;
  // HANDLERS

  if (orders?.length == 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          There is no order see.
        </h2>
        <Button variant="destructive">
          <Link to="/cart">Check your cart</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container w-full max-w-xl">
      <h2 className="text-center font-bold text-2xl mb-12 mt-12">
        Your Orders
      </h2>
      <div>
        <div className="">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Track order</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading &&
                [...Array(3)].map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Skeleton className="h-5 w-[30px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-[50px]" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="h-6 w-[80px] ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}

              {orders?.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>#{item.id}</TableCell>
                    <TableCell>{item.status}</TableCell>

                    <TableCell className="text-right">
                      <Button>
                        <Link to={`/orders/${item.id}`}>Track</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
export default OrdersPage;
