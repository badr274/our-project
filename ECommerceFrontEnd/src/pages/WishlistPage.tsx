// import { setWishlist } from "@/app/features/wihslistStoreSlice";
// import { setWishlist } from "@/app/features/wihslistStoreSlice";
import { useAppSelector } from "@/app/hooks";
// import { useGetWishlistItemsQuery } from "@/app/services/WishlistSlice";
// import { useGetWishlistItemsQuery } from "@/app/services/WishlistSlice";
// import MyCardSkeleton from "@/components/MyCardSkeleton";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { IWishlist } from "@/interfaces";
// import CookieService from "@/services/CookieService";
// import CookieService from "@/services/CookieService";
import { useState } from "react";

const WishlistPage = () => {
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);
  // const token = CookieService.get("token");
  // const { isLoading, data: wishlistData } = useGetWishlistItemsQuery(
  //   undefined,
  //   {
  //     skip: !token,
  //   }
  // );
  // console.log(wishlistData);
  const wishlist = useAppSelector((state) => state.wislistStore.wishlist);
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(setWishlist(wishlistData?.wishlists as []));
  // }, [wishlistData?.wishlists, dispatch]);
  // Handlers
  const handleShowMore = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 500));
    setVisibleCount((prev) => prev + 10);
    setLoading(false);
  };
  // if (isLoading) {
  //   return (
  //     <div className="grid grid-cols-1 gap-2 container mx-auto xl:grid-cols-4 md:grid-cols-3 mt-7">
  //       {[...Array(10)].map((_, idx) => (
  //         <MyCardSkeleton key={idx} />
  //       ))}
  //     </div>
  //   );
  // }
  // Renders
  console.log(wishlist);
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
        Browse Our Collection
      </h1>
      <div className="grid grid-cols-1 gap-2 container mx-auto xl:grid-cols-4 md:grid-cols-3">
        {renderWishlistItems}
      </div>
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
