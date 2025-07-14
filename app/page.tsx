import { auth } from "@clerk/nextjs/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { PostCard } from "@/components/post-card";
import { AppSidebar } from "@/components/app-sidebar";
import { BottomNavigation } from "@/components/bottom-navigation";
import { CreatePostForm } from "@/components/CreatePostForm";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
 

function SignInPrompt() {
  return (
    <Card className="mb-6">
      <CardContent className="p-4 lg:p-6">
        <div className="text-center">
          <p className="mb-4">Sign in to share your thoughts with the world!</p>
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default async function HomePage() {
  const { userId: clerkId } = await auth();

  const postsData = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      _count: {
        select: { likes: true, comments: true },
      },
    },
   });

  let posts;

  if (clerkId) {
    const currentUser = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });

    if (currentUser) {
      const postIds = postsData.map(p => p.id);
      const authorIds = [...new Set(postsData.map(p => p.authorId))];

      const userLikes = await prisma.like.findMany({
        where: {
          userId: currentUser.id,
          postId: { in: postIds },
        },
        select: { postId: true },
      });
      const likedPostIds = new Set(userLikes.map(like => like.postId));

      const userFollows = await prisma.follows.findMany({
        where: {
          followerId: currentUser.id,
          followingId: { in: authorIds },
        },
        select: { followingId: true },
      });
      const followedAuthorIds = new Set(userFollows.map(follow => follow.followingId));

      posts = postsData.map(post => ({
        ...post,
        isOwn: post.author.clerkId === clerkId,
        isLiked: likedPostIds.has(post.id),
        isFollowingAuthor: followedAuthorIds.has(post.authorId),
      }));
    } else {
      posts = postsData.map(post => ({ ...post, isOwn: false, isLiked: false, isFollowingAuthor: false }));
    }
  } else {
    posts = postsData.map(post => ({ ...post, isOwn: false, isLiked: false, isFollowingAuthor: false }));
  }

  return (
    <>
      <AppSidebar />
      <div className="min-h-screen bg-background pb-20 lg:pb-0 lg:pl-72">
        <div className="max-w-2xl mx-auto p-4 lg:p-8">
          <SignedIn>
            <CreatePostForm />
          </SignedIn>
          <SignedOut>
            <SignInPrompt />
          </SignedOut>
          <div className="space-y-0">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <BottomNavigation />
      </div>
    </>
  );
}