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
import productImage from "@/assets/ace.jpg";
import { truncateText } from "@/lib/utils";
interface IProductCard {
  product: IProduct;
  productsPage?: boolean;
}
const ProductCard = ({ product, productsPage }: IProductCard) => {
  const dispatch = useAppDispatch();
  const { id, title, description } = product;
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  return (
    <Card className="py-0 overflow-hidden">
      <Link to={`${productsPage ? `${id}` : `/products/${id}`}`}>
        <img
          src={`${productImage}`}
          alt="Product image"
          className="w-fit max-w-full"
        />
      </Link>
      {/* <div className="flex flex-col justify-between flex-1"> */}
      <CardHeader>
        <CardTitle>{truncateText(title)}</CardTitle>
        <CardDescription className="text-slate-500">
          {truncateText(description)}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pb-6 mt-auto">
        <Button onClick={handleAddToCart}>Add to cart</Button>
      </CardFooter>
      {/* </div> */}
    </Card>
  );
};

export default ProductCard;
