import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useRemoveProductFromCartMutation } from "@/app/services/CartSlice";
import { setCartItems } from "@/app/features/ShoppingCartSlice";
import { ICartProduct } from "@/interfaces";
import { calcTotalPrice } from "@/utils";

export const useCart = () => {
  const cartItems = useAppSelector((state) => state.shoppingCart.cartItems || []);
  const dispatch = useAppDispatch();
  const [removeFromCart] = useRemoveProductFromCartMutation();

  const totalPrice = calcTotalPrice(cartItems as ICartProduct[]);
  const estimateShipping = cartItems.length ? 10 : 0;

  const handleRemoveFromCart = async (id: number) => {
    await removeFromCart({ product_id: id }).then((res) => {
      dispatch(setCartItems(res.data?.cart as ICartProduct[]));
    });
  };

  return {
    cartItems,
    totalPrice,
    estimateShipping,
    handleRemoveFromCart
  };
}; 