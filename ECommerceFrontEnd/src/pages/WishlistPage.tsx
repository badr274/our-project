import { useAppSelector } from "@/app/hooks";

import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { IWishlist } from "@/interfaces";

import { useState } from "react";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);

  const wishlist = useAppSelector((state) => state.wislistStore.wishlist);

  // Handlers
  const handleShowMore = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 500));
    setVisibleCount((prev) => prev + 10);
    setLoading(false);
  };
  // Renders
  const renderWishlistItems = wishlist
    ?.slice(0, visibleCount)
    .map((wishItem: IWishlist) => {
      const { product } = wishItem;
      return (
        <ProductCard
          key={product.id}
          product={product}
          wishProductId={wishItem.id}
        />
      );
    });
  return (
    <div className="mt-12 px-2 container mx-auto">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-7">
        Browse Your Wishlist
      </h1>
      {wishlist?.length == 0 ? (
        <div className="flex items-center justify-center flex-col space-y-2 mt-5">
          <p className="text-lg text-red-700">your wishlist is empty!</p>
          <Button size="lg" variant="outline">
            <Link to="/products">Browse</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 container mx-auto xl:grid-cols-4 md:grid-cols-3">
          {renderWishlistItems}
        </div>
      )}

      {visibleCount < Array(wishlist).length && (
        <div className="w-full flex items-center justify-center">
          <Button onClick={handleShowMore} className="mt-8 btn btn-primary">
            {loading ? "Loading..." : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
