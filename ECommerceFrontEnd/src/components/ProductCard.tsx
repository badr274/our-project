import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { IProduct } from "@/interfaces";
import { truncateText } from "@/lib/utils";
import { useAddProductToCartMutation } from "@/app/services/CartSlice";
import CookieService from "@/services/CookieService";
import { useAuthDialog } from "@/context/AuthDialogContext";
import { useAppDispatch } from "@/app/hooks";
import { setCartItems } from "@/app/features/ShoppingCartSlice";
import {
  useAddItemToWishlistMutation,
  useRemoveItemFromWishlistMutation,
} from "@/app/services/WishlistSlice";
import { Heart, ShoppingCart } from "lucide-react";
import { setWishlist } from "@/app/features/wihslistStoreSlice";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
interface IProductCard {
  product: IProduct;
  productsPage?: boolean;
  wishProductId?: number;
}
const ProductCard = ({
  product,
  productsPage,
  wishProductId,
}: IProductCard) => {
  const { pathname } = useLocation();
  // const cartItems = useAppSelector((state) => state.shoppingCart.cartItems);
  const dispatch = useAppDispatch();
  const { authDialogOpen } = useAuthDialog();
  const { id, title, description, image } = product;
  const [addProductToCart] = useAddProductToCartMutation();
  const [addItemToWishlist] = useAddItemToWishlistMutation();
  const [removeItemFromWishlist] = useRemoveItemFromWishlistMutation();

  const handleAddToCart = async () => {
    const token = CookieService.get("token");
    if (!token) {
      authDialogOpen();
      return;
    }
    try {
      const { data } = await addProductToCart({
        product_id: id,
        quantity: 1,
      });
      dispatch(setCartItems(data?.cart));
      toast.success(data?.message as string);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddToWishlist = async () => {
    const token = CookieService.get("token");
    if (!token) {
      authDialogOpen();
      return;
    }
    try {
      const { data, error } = await addItemToWishlist({ product_id: id });
      if ((error as FetchBaseQueryError)?.status === 422) {
        toast.error("The product has already been taken.");
      } else {
        dispatch(setWishlist(data?.wishlists));
        toast.success(data?.message as string);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromWishlist = async () => {
    try {
      const { data } = await removeItemFromWishlist({
        product_id: wishProductId as number,
      });
      dispatch(setWishlist(data?.wishlists));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="py-0 overflow-hidden">
      <Link to={`${productsPage ? `${id}` : `/products/${id}`}`}>
        <img
          src={`${image}`}
          alt="Product image"
          className="w-fit max-w-full"
        />
      </Link>
      <CardHeader>
        <CardTitle>{truncateText(title)}</CardTitle>
        <CardDescription className="text-slate-500">
          {truncateText(description)}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pb-6 mt-auto flex gap-2 flex-col sm:flex-row sm:gap-1">
        <Button onClick={handleAddToCart} className="flex-1">
          <ShoppingCart />
          Add to cart
        </Button>
        {pathname == "/wishlist" ? (
          <Button
            onClick={removeFromWishlist}
            variant="destructive"
            className="flex-1"
          >
            {/* <Heart /> */}
            Remove
          </Button>
        ) : (
          <Button
            onClick={handleAddToWishlist}
            variant="destructive"
            className="flex-1"
          >
            <Heart />
            Add to wishlist
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
