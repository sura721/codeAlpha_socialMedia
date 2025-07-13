import { Search } from "lucide-react"

function SkeletonItem() {
  return (
    <div className="p-4 flex items-start gap-3">
      <div className="h-12 w-12 rounded-full bg-muted animate-pulse" />
      <div className="flex-1 mt-1">
        <div className="h-4 w-4/5 rounded bg-muted animate-pulse" />
        <div className="h-3 w-1/4 rounded bg-muted animate-pulse mt-2" />
      </div>
    </div>
  )
}

export default function NotificationsLoading() {
  return (
    <div className="hidden lg:block min-h-screen bg-background lg:pl-64">
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <div className="h-10 w-full rounded-full bg-muted animate-pulse pl-10" />
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <div className="h-6 w-16 rounded-md bg-muted animate-pulse mb-4" />
            <div className="space-y-2">
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
            </div>
          </div>
          <div>
            <div className="h-6 w-20 rounded-md bg-muted animate-pulse mb-4" />
            <div className="space-y-2">
              <SkeletonItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}