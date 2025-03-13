import { IProduct } from "@/interfaces";
import ProductCard from "./ProductCard";
import MyCardSkeleton from "./MyCardSkeleton";
import { useGetLimitProductsQuery } from "@/app/services/ProductsSlice";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const LimitProducts = () => {
  const { isLoading, data } = useGetLimitProductsQuery({});

  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-2 container mx-auto xl:grid-cols-4 md:grid-cols-3">
        {[...Array(10)].map((_, idx) => (
          <MyCardSkeleton key={idx} />
        ))}
      </div>
    );
  }
  // Renders
  const renderProductList = data.products.map((product: IProduct) => {
    return (
      <ProductCard key={product.id} product={product} productsPage={false} />
    );
  });

  return (
    <div className="space-y-6 px-2">
      <h2 className="text-2xl md:text-3xl font-bold">Our Products</h2>
      <div className="grid grid-cols-1 gap-2 container mx-auto xl:grid-cols-4 md:grid-cols-3">
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

export default LimitProducts;
