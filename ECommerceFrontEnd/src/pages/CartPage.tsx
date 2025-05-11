import { useCart } from "@/Hooks/useCart";
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
import { CircleX } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, totalPrice, estimateShipping, handleRemoveFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <span>{item.product.title}</span>
                  </div>
                </TableCell>
                <TableCell>${item.product.price}</TableCell>
                <TableCell>
                  <QuantitySelector initialQuantity={item.quantity} id={item.id} />
                </TableCell>
                <TableCell>${(item.product.price * item.quantity).toFixed(2)}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    <CircleX className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Subtotal</TableCell>
              <TableCell>${totalPrice.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Shipping</TableCell>
              <TableCell>${estimateShipping.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} className="font-bold">Total</TableCell>
              <TableCell className="font-bold">
                ${(totalPrice + estimateShipping).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
};

export default CartPage;
