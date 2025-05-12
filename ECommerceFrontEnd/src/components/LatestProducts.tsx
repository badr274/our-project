import { IProduct } from "@/interfaces";
import ProductCard from "./ProductCard";
import MyCardSkeleton from "./MyCardSkeleton";
import { useGetLatestProductsQuery } from "@/app/services/ProductsSlice";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const LatestProducts = () => {
  const { isLoading, data, error } = useGetLatestProductsQuery({});

  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 container mx-auto sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4">
        {[...Array(10)].map((_, idx) => (
          <MyCardSkeleton key={idx} />
        ))}
      </div>
    );
  }
  if (error) return <h1>Error</h1>;
  // Renders
  const renderProductList = data.latestProducts.map((product: IProduct) => {
    return (
      <ProductCard key={product.id} product={product} productsPage={false} />
    );
  });

  return (
    <div className="space-y-6 px-2 my-10 container">
      <h2 className="text-2xl md:text-3xl font-bold">Our Latest Products</h2>
      <div className="grid grid-cols-1 gap-5 container mx-auto sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ">
        {renderProductList}
      </div>
      <div className="flex justify-center items-center">
        <Button
          variant={"destructive"}
          className="w-[150px]"
          onClick={() => navigate("/products")}
        >
          Show all
        </Button>
      </div>
    </div>
  );
};

export default LatestProducts;
