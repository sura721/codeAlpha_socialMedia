import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { BottomNavigation } from "@/components/bottom-navigation";
import { PostView } from "@/components/PostView";
export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { userId: clerkId } =await auth();
const {id} = await params;
  const post = await prisma.post.findUnique({
    where: { id:id },
    include: {
      author: true,
      comments: {
        include: {
          author: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
      _count: {
        select: { likes: true, comments: true },
      },
      likes: clerkId ? { where: { user: { clerkId } } } : false,
    },
  });

  if (!post) {
    notFound();
  }

  const postWithState = {
    ...post,
    isOwn: post.author.clerkId === clerkId,
    isLiked: !!post.likes?.length,
  };

  return (
    <>
      <AppSidebar />
      <div className="min-h-screen bg-background pb-20 lg:pb-0 lg:pl-72">
        <div className="max-w-2xl mx-auto p-4 lg:p-8">
          <PostView post={postWithState} />
        </div>
      </div>
      <div className="lg:hidden">
        <BottomNavigation />
      </div>
    </>
  );
}