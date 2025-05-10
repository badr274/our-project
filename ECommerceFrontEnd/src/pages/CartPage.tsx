import { useAppDispatch, useAppSelector } from "@/app/hooks";
import QuantitySelector from "@/components/QuantitySelector";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { calcPriceAfterDiscount, calcTotalPrice } from "@/utils";
import { CircleX } from "lucide-react";
import { Link } from "react-router-dom";
import { ICartProduct } from "@/interfaces";
import { useRemoveProductFromCartMutation } from "@/app/services/CartSlice";
import { setCartItems } from "@/app/features/ShoppingCartSlice";
const CartPage = () => {
  const cartItems = useAppSelector(
    (state) => state.shoppingCart.cartItems || []
  );

  // Handle Payment

  const dispatch = useAppDispatch();
  const [removeFromCart] = useRemoveProductFromCartMutation();
  const totalPrice = calcTotalPrice(cartItems as ICartProduct[]);
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
      <div>
        {cartItems?.length ? (
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Item</TableHead>
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
                      <TableCell>
                        $
                        {(
                          calcPriceAfterDiscount(
                            item.product.price,
                            item.product.discount
                          ) * item.quantity
                        )
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
                <TableRow className="text-base md:text-lg">
                  <TableCell colSpan={4}>Total</TableCell>
                  <TableCell className="text-right">
                    ${totalPrice.toFixed(2).toLocaleString()}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <Button size="lg" className="mt-4">
              <Link to={`/checkout?total=${totalPrice}`}>Checkout</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-2 text-center w-full">
            <p>The cart is empty</p>
            <Button>
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default CartPage;
