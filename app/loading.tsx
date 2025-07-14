const PostCardSkeleton = () => (
  <div className="bg-card border-b border-border p-4 sm:p-6">
    <div className="flex items-start space-x-4">
      <div className="h-12 w-12 rounded-full bg-muted animate-pulse"></div>
      <div className="flex-1 space-y-3 pt-2">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-32 bg-muted rounded-md animate-pulse"></div>
          <div className="h-4 w-24 bg-muted rounded-md animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted rounded-md animate-pulse"></div>
          <div className="h-4 w-5/6 bg-muted rounded-md animate-pulse"></div>
        </div>
        <div className="aspect-video w-full bg-muted rounded-lg animate-pulse mt-3"></div>
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
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <div className="h-20 w-full bg-muted rounded-lg animate-pulse mb-3"></div>
              <div className="flex justify-end">
                <div className="h-10 w-24 bg-muted rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="space-y-0 border-t border-border">
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </div>
        </div>
      </div>
    </>
  );
}