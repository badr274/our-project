import { useAppDispatch, useAppSelector } from "@/app/hooks";
import QuantitySelector from "@/components/QuantitySelector";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calcTotalPrice } from "@/utils";
import { CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ICartProduct } from "@/interfaces";
import { useRemoveProductFromCartMutation } from "@/app/services/CartSlice";
import { setCartItems } from "@/app/features/ShoppingCartSlice";
const CartPage = () => {
  const cartItems = useAppSelector(
    (state) => state.shoppingCart.cartItems || []
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [removeFromCart] = useRemoveProductFromCartMutation();
  const totalPrice = calcTotalPrice(cartItems as ICartProduct[]);
  const estimateShipping = cartItems.length ? 10 : 0;
  // HANDLERS
  const handleRemoveFromCart = async (id: number) => {
    await removeFromCart({ product_id: id }).then((res) => {
      dispatch(setCartItems(res.data?.cart as ICartProduct[]));
    });
  };
  // RENDERS
  return (
    <div className="container">
      <h2 className="text-center font-bold text-2xl mb-12 mt-12">
        Your Cart [{cartItems.length} item{cartItems.length > 1 ? "s" : null}]
      </h2>
      <div className="flex flex-col lg:flex-row gap-4">
        {cartItems?.length ? (
          <Table>
            <TableCaption>A list of your recent items.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Item</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="flex items-center justify-end"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <img
                          src={item.product.image}
                          alt="product image"
                          className="max-w-[80px] lg:max-w-[120px]"
                        />
                        <h5 className="font-semibold mb-2 lg:text-lg">
                          {item.product.title}
                        </h5>
                      </div>
                    </TableCell>
                    <TableCell>Pending</TableCell>
                    <TableCell>
                      $
                      {(item.product.price * item.quantity)
                        .toFixed(2)
                        .toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <QuantitySelector
                        initialQuantity={item.quantity}
                        id={item.id}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <CircleX
                        className="mr-2 cursor-pointer inline hover:text-destructive transition"
                        onClick={() => handleRemoveFromCart(item.id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-right">
                  ${totalPrice.toFixed(2).toLocaleString()}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ) : null}
        <div className="flex-1/3 p-3">
          <h3 className="font-semibold text-lg mb-3">Summary:</h3>
          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between text-sm">
              <span className="name">Subtotal</span>
              <span className="value">
                ${totalPrice.toFixed(2).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="name">Estimate shipping & handling</span>
              <span className="value">${estimateShipping.toFixed(2)}</span>
            </div>
          </div>
          <hr />
          <div className="flex items-center justify-between text-destructive text-sm font-semibold mt-3">
            <span className="name">Total</span>
            <span className="value ">
              ${(totalPrice + estimateShipping).toFixed(2)}
            </span>
          </div>
          <div>
            <Button
              className="w-full mt-7"
              onClick={() => navigate("/checkout")}
            >
              Check Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
