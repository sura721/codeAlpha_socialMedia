 
import { AppSidebar } from "@/components/app-sidebar";

const PostCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 p-4 sm:p-6">
    <div className="flex items-start space-x-4">
      <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-800 animate-pulse"></div>
      <div className="flex-1 space-y-3 pt-2">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-800 rounded-md animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-800 rounded-md animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-800 rounded-md animate-pulse"></div>
          <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-800 rounded-md animate-pulse"></div>
        </div>
        <div className="aspect-video w-full bg-gray-300 dark:bg-gray-800 rounded-lg animate-pulse mt-3"></div>
      </div>
    </div>
  </div>
);

export default function HomePageLoading() {
  return (
    <>
       <div className="min-h-screen bg-background pb-20 lg:pb-0 lg:pl-72">
        <div className="max-w-2xl mx-auto">
          <div className="p-4 lg:p-8">
            <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 mb-6">
              <div className="h-10 w-full bg-gray-300 dark:bg-gray-800 rounded-lg animate-pulse mb-3"></div>
              <div className="h-8 w-24 bg-purple-400 rounded-lg animate-pulse ml-auto"></div>
            </div>
          </div>
          <div className="space-y-0">
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </div>
        </div>
      </div>
    </>
  );
}