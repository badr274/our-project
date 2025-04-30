import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { ReactNode } from "react";
import { useAppSelector } from "@/app/hooks";
import { CircleX } from "lucide-react";
import QuantitySelector from "./QuantitySelector";
import { useNavigate } from "react-router-dom";
import productImage from "@/assets/ace.jpg";
import { useRemoveProductFromCartMutation } from "@/app/services/CartSlice";
interface IProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen(value: boolean): void;
}

const ShoppingCart = ({ isOpen, setIsOpen, children }: IProps) => {
  const [removeFromCart] = useRemoveProductFromCartMutation();
  const cartItems = useAppSelector(
    (state) => state.shoppingCart.cartItems || []
  );
  const navigate = useNavigate();
  const handleClickShowMyCart = () => {
    navigate("/cart");
    setIsOpen(false);
  };
  // HANDLERS
  const handleRemoveFromCart = async (id: number) => {
    await removeFromCart({ product_id: id });
    // .then((res) => {
    // dispatch(setCartItems(res.data as ICartProduct[]));
    // console.log(res.data);
    // });
  };
  // RENDERS
  const renderShoppingCartItems = cartItems.map((item) => {
    return (
      <div key={item.id} className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={item.product.image}
            alt="product image"
            className="max-w-[100px] lg:max-w-[180px]"
          />
          <div>
            <h5 className="font-semibold mb-1 lg:text-lg">
              {item.product.title}
            </h5>
            <div className="text-sm text-gray-500 lg:text-base">
              Category: {item.product.category}
            </div>
            <strong className="text-[14px] lg:text-base">
              ${(item.product.price * item.quantity).toLocaleString()}
            </strong>
            <div className="text-destructive mb-2">
              Quantity:
              <span className="font-semibold ">{item.quantity}</span>
            </div>
            <QuantitySelector initialQuantity={item.quantity} id={item.id} />
          </div>
        </div>
        <CircleX
          className="mr-2 cursor-pointer hover:text-destructive transition"
          onClick={() => handleRemoveFromCart(item.id)}
        />
      </div>
    );
  });
  return (
    <Drawer autoFocus open={isOpen}>
      {children}
      <DrawerContent className="h-full">
        <DrawerHeader>
          <DrawerTitle className="text-lg lg:text-xl">
            Shopping Cart
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="space-y-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
          {renderShoppingCartItems}
        </div>
        <DrawerFooter>
          <Button onClick={handleClickShowMyCart}>Show my cart</Button>
          <DrawerClose asChild onClick={() => setIsOpen(false)}>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ShoppingCart;
