// app/profile/loading.tsx

import { Loader } from 'lucide-react';

const Skeleton = () => <div className="bg-gray-200 dark:bg-gray-800/80 rounded-lg animate-pulse"></div>;

export default function ProfileLoading() {
  return (
    <>
      {/* Desktop Skeleton */}
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
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>

      {/* Mobile Skeleton */}
      <div className="lg:hidden min-h-screen flex flex-col items-center justify-center bg-background">
          <Loader className="h-12 w-12 animate-spin text-purple-500" />
          <p className="mt-4 text-muted-foreground font-semibold">Loading Profile...</p>
      </div>
    </>
  );
}