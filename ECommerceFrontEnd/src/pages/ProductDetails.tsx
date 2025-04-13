import { addToCart } from "@/app/features/ShoppingCartSlice";
import { useAppDispatch } from "@/app/hooks";
import { useGetSingleProductQuery } from "@/app/services/ProductsSlice";
import MyCardSkeleton from "@/components/MyCardSkeleton";
import MyProductDetailsSkeleton from "@/components/MyProductDetailsSkeleton";
import ProductCard from "@/components/ProductCard";
import StarRating from "@/components/StarRating";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/interfaces";
import { calcPriceDiscount } from "@/utils";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import productImage from "@/assets/ace.jpg";
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, error } = useGetSingleProductQuery(id);
  const dispatch = useAppDispatch();
  if (isLoading) return <MyProductDetailsSkeleton />;
  if (error) return <h1>Errror</h1>;
  const { title, description, price, discountPercentage } =
    data.product as IProduct;

  // const calcRating = () => {
  //   if (reviews) {
  //     let rating = 0;
  //     for (let i = 0; i < reviews.length; i++) {
  //       rating += reviews[i].rating;
  //     }
  //     return rating;
  //   }
  // };
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-2 container mx-auto xl:grid-cols-4 md:grid-cols-3 mt-7">
        {[...Array(10)].map((_, idx) => (
          <MyCardSkeleton key={idx} />
        ))}
      </div>
    );
  }
  const handleAddToCart = () => {
    if (!data) return;
    dispatch(addToCart(data.product));
  };
  // Renders
  const renderSimilarProducts = data.SimilarProducts.map(
    (product: IProduct) => {
      return <ProductCard key={product.id} product={product} />;
    }
  );
  return (
    <div className="mt-12">
      <div>
        <div
          className="text-base mb-4 lg:text-lg font-bold flex items-center cursor-pointer hover:text-destructive transition w-fit"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={"16px"} />
          <span>Back</span>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="product-images flex-1 flex flex-col gap-5">
            <div className="image-container bg-gray-200 rounded-lg flex justify-center items-center">
              <img
                src={productImage}
                alt="Product Image"
                className=" w-fit max-w-full"
              />
            </div>
          </div>
          <div className="product-details px-2 flex-1 flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl  font-bold">{title}</h2>
            <div className="price-reviews flex  items-center justify-between">
              <div className="price flex items-center gap-2">
                {discountPercentage > 0 ? (
                  <>
                    <span className="old-price line-through text-gray-300">
                      ${price.toLocaleString()}
                    </span>
                    <span className="new-price font-semibold">
                      $
                      {calcPriceDiscount(
                        price,
                        discountPercentage
                      ).toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="font-semibold">
                    ${price?.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="reviews space-y-2">
                <StarRating rating={4} />
                <div className="font-semibold text-gray-500">20 reviews</div>
              </div>
            </div>
            <div className="description">
              <h4 className="text-lg font-semibold mb-2">Description:</h4>
              <p className="text-sm font-medium text-gray-500">{description}</p>
            </div>
            <div className="buttons-action flex items-center gap-4 mt-3 flex-1">
              <Button
                variant={"destructive"}
                className="flex-1"
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>
              <Button variant={"secondary"} className="flex-1">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-12">
          <h2 className="font-bold text-2xl mb-7">Similar Products:</h2>
          <div className="grid grid-cols-1 gap-2 mx-auto xl:grid-cols-4 md:grid-cols-3">
            {renderSimilarProducts}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
