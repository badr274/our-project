import { ICartProduct, IProduct } from "@/interfaces";
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

export const calcPriceAfterDiscount = (price: number, discount: number) => {
  return price - (price * discount) / 100;
};
export const calcTotalPrice = (cartItems: ICartProduct[]) => {
  const arrOfPrices = cartItems.length
    ? cartItems.map(
        (item) =>
          calcPriceAfterDiscount(item.product.price, item.product.discount) *
          item.quantity
      )
    : [];

  const totalPrice = cartItems.length
    ? arrOfPrices.reduce((acc, curr) => acc + curr)
    : 0;
  return totalPrice;
};

export const addDaysToDate = (
  datetimeStr: string = new Date().toISOString(),
  daysToAdd: string | number
): string => {
  // تحويل التاريخ النصي إلى كائن تاريخ
  const datetime = new Date(datetimeStr);

  // تحويل daysToAdd إلى رقم في حالة كان نصًا
  const days = Number(daysToAdd);

  // إضافة الأيام المطلوبة
  datetime.setDate(datetime.getDate() + days);

  // إرجاع التاريخ الجديد بتنسيق تاريخ عادي
  return datetime.toLocaleDateString(); // سيعرض التاريخ بالتنسيق العادي
};
