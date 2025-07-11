"use client"

export function PostSkeleton() {
  return (
    <div className="mb-6 lg:mb-8 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden">
      <div className="p-6 lg:p-8">
        <div className="flex items-start gap-4 lg:gap-6 mb-4 lg:mb-6">
          <div className="h-12 w-12 lg:h-14 lg:w-14 bg-muted rounded-full animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-4 bg-muted rounded animate-pulse w-24" />
              <div className="h-4 bg-muted rounded animate-pulse w-16" />
              <div className="h-4 bg-muted rounded animate-pulse w-12" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse w-full" />
              <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            </div>
          </div>
        </div>
        <div className="h-64 bg-muted rounded-2xl animate-pulse mb-4" />
        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse w-8" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse w-8" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded animate-pulse w-12" />
          </div>
        </div>
      </div>
    </div>
  )
}
