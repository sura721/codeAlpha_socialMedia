import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

 function SkeletonCard() {
  return (
    <Card>
      <CardContent className="p-4 lg:p-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

 function SkeletonTag() {
    return (
        <Card>
            <CardContent className="p-4 lg:p-6">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-muted animate-pulse mb-3 lg:mb-4"></div>
                <div className="h-5 w-3/4 rounded bg-muted animate-pulse mb-2"></div>
                <div className="h-3 w-1/2 rounded bg-muted animate-pulse"></div>
            </CardContent>
        </Card>
    );
}

export default function ExploreLoading() {
  return (
    <>
      {/* Desktop Layout Skeleton */}
      <div className="hidden lg:block min-h-screen bg-background lg:pl-72">
        <div className="max-w-4xl mx-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="h-9 w-48 rounded-md bg-muted animate-pulse" />
            <div className="h-9 w-9 rounded-md bg-muted animate-pulse" />
          </div>

          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <div className="h-12 w-full rounded-full bg-muted animate-pulse pl-10" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="h-7 w-40 rounded-md bg-muted animate-pulse mb-6" />
              <div className="grid grid-cols-2 gap-4">
                <SkeletonTag />
                <SkeletonTag />
                <SkeletonTag />
                <SkeletonTag />
              </div>
            </div>

            <div>
              <div className="h-7 w-48 rounded-md bg-muted animate-pulse mb-6" />
              <div className="space-y-4">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE LAYOUT SKELETON --- */}
      <div className="lg:hidden min-h-screen bg-background pb-20">
        <div className="sticky top-0 z-40 bg-background border-b border-border">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <div className="h-10 w-full rounded-full bg-muted animate-pulse pl-10" />
            </div>
          </div>
        </div>
        
        <div className="p-4">
            <div className="h-6 w-3/5 rounded-md bg-muted animate-pulse mb-4" />
            <div className="grid grid-cols-2 gap-3 mb-8">
                <SkeletonTag />
                <SkeletonTag />
            </div>

            <div className="h-6 w-4/5 rounded-md bg-muted animate-pulse mb-4" />
            <div className="space-y-3">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </div>
        </div>
      </div>
    </>
  );
}