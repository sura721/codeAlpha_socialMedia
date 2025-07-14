// app/profile/loading.tsx

const SkeletonPost = () => <div className="aspect-square rounded-2xl bg-muted animate-pulse"></div>;

export default function ProfileLoading() {
  return (
    <>
      {/* Desktop Skeleton (Unchanged) */}
      <div className="hidden lg:block min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20 lg:pl-72">
        <div className="max-w-5xl mx-auto p-8">
          <div className="relative mb-12">
            <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-3xl animate-pulse"></div>
            <div className="relative -mt-20 px-8">
              <div className="flex flex-col lg:flex-row lg:items-end gap-6">
                <div className="relative">
                  <div className="h-40 w-40 rounded-full bg-gray-300 dark:bg-gray-700 ring-8 ring-white dark:ring-gray-900 shadow-2xl animate-pulse"></div>
                </div>
                <div className="flex-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl animate-pulse">
                  <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-lg mb-6"></div>
                  <div className="flex gap-6 mb-6">
                    <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                    <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                  </div>
                  <div className="flex items-baseline justify-start gap-8">
                    <div className="h-12 w-16 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                    <div className="h-12 w-16 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                    <div className="h-12 w-16 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center border-b border-border/50 mb-12">
            <div className="h-16 w-32 bg-gray-200 dark:bg-gray-800 rounded-t-2xl animate-pulse"></div>
            <div className="h-16 w-32 bg-gray-200 dark:bg-gray-800 rounded-t-2xl animate-pulse ml-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="aspect-square bg-gray-200 dark:bg-gray-800/80 rounded-3xl animate-pulse"></div>
            <div className="aspect-square bg-gray-200 dark:bg-gray-800/80 rounded-3xl animate-pulse"></div>
            <div className="aspect-square bg-gray-200 dark:bg-gray-800/80 rounded-3xl animate-pulse"></div>
            <div className="aspect-square bg-gray-200 dark:bg-gray-800/80 rounded-3xl animate-pulse"></div>
            <div className="aspect-square bg-gray-200 dark:bg-gray-800/80 rounded-3xl animate-pulse"></div>
            <div className="aspect-square bg-gray-200 dark:bg-gray-800/80 rounded-3xl animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* --- NEW Mobile Skeleton --- */}
      <div className="lg:hidden min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20 pb-20">
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
          <div className="flex items-center justify-center p-6">
            <div className="h-6 w-24 bg-muted animate-pulse rounded-md"></div>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <div className="relative">
            <div className="h-32 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            <div className="relative -mt-12 px-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-24 w-24 rounded-full bg-gray-300 dark:bg-gray-700 ring-4 ring-white dark:ring-gray-900 shadow-xl animate-pulse"></div>
                
                <div className="mt-4 mb-6 w-full space-y-3">
                  <div className="h-7 w-1/2 mx-auto bg-muted animate-pulse rounded-md"></div>
                  <div className="h-4 w-3/4 mx-auto bg-muted animate-pulse rounded-md"></div>
                  <div className="h-3 w-1/3 mx-auto bg-muted animate-pulse rounded-md"></div>
                </div>

                <div className="h-11 w-full rounded-2xl bg-muted animate-pulse mb-8"></div>

                <div className="flex items-baseline justify-center gap-8 mb-8">
                  <div className="h-10 w-12 bg-muted animate-pulse rounded-md"></div>
                  <div className="h-10 w-12 bg-muted animate-pulse rounded-md"></div>
                  <div className="h-10 w-12 bg-muted animate-pulse rounded-md"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex border-b border-border/50 mx-4">
            <div className="flex-1 h-12 bg-muted animate-pulse rounded-t-md"></div>
            <div className="flex-1 h-12 bg-muted animate-pulse rounded-t-md ml-2"></div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <SkeletonPost />
              <SkeletonPost />
              <SkeletonPost />
              <SkeletonPost />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}