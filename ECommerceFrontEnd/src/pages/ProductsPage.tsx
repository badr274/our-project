import { useGetProductsQuery } from "@/app/services/ProductsSlice";
import MyCardSkeleton from "@/components/MyCardSkeleton";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/interfaces";
import { useState } from "react";

const ProductsPage = () => {
  const { isLoading, data } = useGetProductsQuery({});
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);
  // Handlers
  const handleShowMore = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 500));
    setVisibleCount((prev) => prev + 10);
    setLoading(false);
  };
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-2 container mx-auto xl:grid-cols-4 md:grid-cols-3 mt-7">
        {[...Array(10)].map((_, idx) => (
          <MyCardSkeleton key={idx} />
        ))}
      </div>
    );
  }
  // Renders
  const renderProductList = data.products
    .slice(0, visibleCount)
    .map((product: IProduct) => {
      return (
        <ProductCard key={product.id} product={product} productsPage={true} />
      );
    });

  return (
    <div className="mt-12 px-2 container mx-auto">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-7">
        Browse Our Collection
      </h1>
      <div className="grid grid-cols-1 gap-2 container mx-auto xl:grid-cols-4 md:grid-cols-3">
        {renderProductList}
      </div>
      {visibleCount < data.products.length && (
        <div className="w-full flex items-center justify-center">
          <Button onClick={handleShowMore} className="mt-8 btn btn-primary">
            {loading ? "Loading..." : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
