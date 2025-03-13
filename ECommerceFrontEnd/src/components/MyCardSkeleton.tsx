import { Skeleton } from "@/components/ui/skeleton";

const MyCardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <div className="space-y-0.5">
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-full" />
          <Skeleton className="h-2 w-full" />
        </div>
        <Skeleton className="h-5 w-[150px]" />
      </div>
    </div>
  );
};
export default MyCardSkeleton;
