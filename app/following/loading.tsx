// app/profile/[username]/following/loading.tsx

import { Card, CardContent } from "@/components/ui/card";
import { MobileHeader } from "@/components/mobile-header";

function SkeletonCard() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-32 rounded bg-muted animate-pulse" />
              <div className="h-3 w-24 rounded bg-muted animate-pulse" />
              <div className="h-3 w-40 rounded bg-muted animate-pulse" />
            </div>
          </div>
          <div className="h-9 w-24 rounded-full bg-muted animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function FollowingLoading() {
  return (
    <>
      {/* Desktop Skeleton */}
      <div className="hidden lg:block min-h-screen bg-background lg:pl-72">
        <div className="max-w-2xl mx-auto p-8">
          <div className="h-8 w-48 rounded bg-muted animate-pulse mb-6" />
          <div className="space-y-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>

      {/* Mobile Skeleton */}
      <div className="lg:hidden min-h-screen bg-background pb-20">
        <MobileHeader title="Loading Following..." showBack />
        <div className="p-4">
          <div className="space-y-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    </>
  );
}