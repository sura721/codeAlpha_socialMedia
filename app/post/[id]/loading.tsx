import { AppSidebar } from "@/components/app-sidebar";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, MessageCircle, Share } from "lucide-react";

function PostSkeleton() {
  return (
    <>
      <div className="mb-6">
        <div className="flex items-start gap-4 mb-6">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>

        <div className="space-y-3 mb-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
        </div>

        <Skeleton className="rounded-lg w-full h-[450px] mb-6" />

        <div className="flex items-center justify-between py-4 border-t border-b border-border">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-gray-300" />
            <Skeleton className="h-4 w-4" />
          </div>
           <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-gray-300" />
            <Skeleton className="h-4 w-4" />
          </div>
           <div className="flex items-center gap-2">
            <Share className="h-4 w-4 text-gray-300" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </div>
      <div>
        <div className="space-y-4 border-b border-border pb-6">
          <div className="flex gap-3 py-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-full" />
              </div>
          </div>
           <div className="flex gap-3 py-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-4 w-[80%]" />
              </div>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 flex-1 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </>
  );
}

export default function Loading() {
    return (
        <>
            <AppSidebar />
            <div className="min-h-screen bg-background pb-20 lg:pb-0 lg:pl-72">
                <div className="max-w-2xl mx-auto p-4 lg:p-8 animate-pulse">
                    <PostSkeleton />
                </div>
            </div>
            <div className="lg:hidden">
                <BottomNavigation />
            </div>
        </>
    );
}