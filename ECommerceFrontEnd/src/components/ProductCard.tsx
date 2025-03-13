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
import { useAppDispatch } from "@/app/hooks";
import { addToCart } from "@/app/features/ShoppingCartSlice";
import { toast } from "sonner";

interface IProductCard {
  product: IProduct;
  productsPage?: boolean;
}
const ProductCard = ({ product, productsPage }: IProductCard) => {
  const dispatch = useAppDispatch();
  const { id, title, description, thumbnail, category } = product;
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Product added successfully!");
  };
  return (
    <Card>
      <Link
        to={`${
          productsPage
            ? `${id}?category=${category}`
            : `/products/${id}?category=${category}`
        }`}
      >
        <img src={thumbnail} alt="Product image" className="w-fit max-w-full" />
      </Link>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button onClick={handleAddToCart}>Add to cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
