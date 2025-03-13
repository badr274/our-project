import { Skeleton } from "@/components/ui/skeleton";

const MyProductDetailsSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 h-[300px] mt-7">
      <Skeleton className="flex-1 rounded-xl" />
      <div className="flex-1 space-y-3 flex flex-col">
        <Skeleton className="h-4 w-[80%]" />
        <div className="flex  items-center justify-between">
          <Skeleton className="h-3 w-[100px]" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-[100px]" />
            <Skeleton className="h-3 w-[100px]" />
          </div>
        </div>
        <div className="space-y-0.5">
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-full" />
        </div>
        <div className="flex items-center gap-4 mt-3 flex-1">
          <Skeleton className="h-5 flex-1" />
          <Skeleton className="h-5 flex-1" />
        </div>
      </div>
    </div>
  );
};
export default MyProductDetailsSkeleton;
