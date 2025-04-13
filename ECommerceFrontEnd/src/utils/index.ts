import { IProduct } from "@/interfaces";
import { toast } from "react-hot-toast";

export const calcPriceDiscount = (
  price: number,
  discountPercentage: number
) => {
  return price - (price * discountPercentage) / 100;
};

export const addToShoppingCart = (
  cartItem: IProduct,
  shoppingCartItems: IProduct[]
) => {
  const existsItem = shoppingCartItems.find((item) => item.id === cartItem.id);
  if (existsItem) {
    toast.success(
      "This item is already in the cart, the quantity will be increased"
    );
    return shoppingCartItems.map((item) =>
      item.id === cartItem.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  toast.success("Product added successfully!");
  return [...shoppingCartItems, { ...cartItem, quantity: 1 }];
};

export const calcTotalPrice = (cartItems: IProduct[]) => {
  const arrOfPrices = cartItems.length
    ? cartItems.map((item) => item.price * item.quantity)
    : [];

  const totalPrice = cartItems.length
    ? arrOfPrices.reduce((acc, curr) => acc + curr)
    : 0;
  return totalPrice;
};
