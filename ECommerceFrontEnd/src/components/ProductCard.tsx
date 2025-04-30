import { Link } from "react-router-dom";
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
interface IProductCard {
  product: IProduct;
  productsPage?: boolean;
}
const ProductCard = ({ product, productsPage }: IProductCard) => {
  const dispatch = useAppDispatch();
  const { authDialogOpen } = useAuthDialog();
  const { id, title, description, image } = product;
  const [addProductToCart] = useAddProductToCartMutation();
  const handleAddToCart = () => {
    const token = CookieService.get("token");
    if (!token) {
      authDialogOpen();
      return;
    }
    addProductToCart({ product_id: id, quantity: 1 }).then((res) => {
      dispatch(setCartItems(res.data?.cart));
    });
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
      <CardFooter className="pb-6 mt-auto">
        <Button onClick={handleAddToCart}>Add to cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
