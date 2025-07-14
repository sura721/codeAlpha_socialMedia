 
const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-950/50 rounded-lg p-4 flex items-center gap-4">
    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
      <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse"></div>
    </div>
  </div>
);

export function SearchResultSkeleton() {
  return (
    <div className="space-y-3">
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}