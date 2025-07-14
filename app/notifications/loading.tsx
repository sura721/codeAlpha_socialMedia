import { Search } from "lucide-react";

function SkeletonItem() {
  return (
    <div className="p-4 flex items-start gap-4 border-b border-border/20">
      <div className="h-10 w-10 rounded-full bg-muted animate-pulse shrink-0" />
      <div className="flex-1 space-y-2 mt-1">
        <div className="h-4 w-4/5 rounded bg-muted animate-pulse" />
        <div className="h-3 w-1/4 rounded bg-muted animate-pulse" />
      </div>
    </div>
  );
}

export default function NotificationsLoading() {
  return (
    <>
      <div className="hidden lg:block min-h-screen bg-background lg:pl-72">
        <div className="max-w-2xl mx-auto p-8">
          <div className="h-8 w-48 rounded-md bg-muted animate-pulse mb-8" />
          <div className="space-y-8">
            <div>
              <div className="h-6 w-24 rounded-md bg-muted animate-pulse mb-4" />
              <div className="border rounded-lg overflow-hidden">
                <SkeletonItem />
                <SkeletonItem />
                <SkeletonItem />
              </div>
            </div>
            <div>
              <div className="h-6 w-32 rounded-md bg-muted animate-pulse mb-4" />
              <div className="border rounded-lg overflow-hidden">
                <SkeletonItem />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden min-h-screen bg-background pb-20">
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-center p-4 h-16">
            <div className="h-6 w-32 rounded-md bg-muted animate-pulse"></div>
          </div>
        </div>
        <div className="p-0">
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </div>
      </div>
    </>
  );
}