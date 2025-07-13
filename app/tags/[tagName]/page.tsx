import React from 'react';
import { getPostsForHashtagPage } from '@/lib/data-service';
import { PostCard } from '@/components/post-card';
interface HashtagPageProps {
params: Promise<{
tagName: string;
}>;
}
export const revalidate = 60;
export default async function HashtagPage({ params }: HashtagPageProps) {
const { tagName } = await params;
const posts = await getPostsForHashtagPage(tagName);
const decodedTagName = decodeURIComponent(tagName);
return (
<div className="max-w-2xl mx-auto py-8 px-4">
<div className="mb-6">
<h1 className="text-4xl font-extrabold tracking-tight">#{decodedTagName}</h1>
<p className="text-lg text-muted-foreground mt-1">{posts.length} posts</p>
</div>  {posts.length > 0 ? (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  ) : (
    <div className="text-center py-16">
      <p className="text-xl font-semibold">No posts found</p>
      <p className="text-muted-foreground mt-2">
        There are no posts with the #{decodedTagName} tag yet.
      </p>
    </div>
  )}
</div>
);
}