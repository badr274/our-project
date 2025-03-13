import { useGetProductsQuery } from "@/app/services/ProductsSlice";
import MyCardSkeleton from "@/components/MyCardSkeleton";
import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/interfaces";

const ProductsPage = () => {
  const { isLoading, data } = useGetProductsQuery({});

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
  const renderProductList = data.products.map((product: IProduct) => {
    return (
      <ProductCard key={product.id} product={product} productsPage={true} />
    );
  });

  return (
    <div className="mt-12 px-2">
      <h1 className="text-xl lg:text-2xl font-bold mb-7">
        Browse Our Collection
      </h1>
      <div className="grid grid-cols-1 gap-2 container mx-auto xl:grid-cols-4 md:grid-cols-3">
        {renderProductList}
      </div>
    </div>
  );
};

export default ProductsPage;
