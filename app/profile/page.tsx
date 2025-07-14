import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import ProfileClient from "@/components/ProfileClient";
import { User, Post, Comment } from "@/lib/generated";

type CommentWithPost = Comment & {
  post: { id: string; content: string | null; image: string | null };
};

export type ActivityData = {
  likesGiven: number;
  commentsWritten: number;
  commentsReceived: number;
  recentComments: CommentWithPost[];
};

export default async function ProfilePage() {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return notFound();
  }

  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true },
  });

  if (!user) {
    return notFound();
  }

   const [userWithDetails, commentsReceivedCount, recentComments] = await Promise.all([
    prisma.user.findUnique({
      where: { id: user.id },
      include: {
        posts: {
          select: {
            id: true,
            image: true,
            content: true,
            authorId: true,
            createdAt: true,
            updatedAt: true,
            isHighlight: true,
          },
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
            likes: true,
            comments: true,
          },
        },
      },
       
    }),
    prisma.comment.count({
      where: { post: { authorId: user.id } },
    }),
    prisma.comment.findMany({
      where: { authorId: user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        post: {
          select: { id: true, content: true, image: true },
        },
      },
    }),
  ]);

  if (!userWithDetails) {
    return notFound();
  }

  const activityData: ActivityData = {
    likesGiven: userWithDetails._count.likes,
    commentsWritten: userWithDetails._count.comments,
    commentsReceived: commentsReceivedCount,
    recentComments: recentComments,
  };

  return (
    <ProfileClient
      user={userWithDetails}
      posts={userWithDetails.posts}
      followerCount={userWithDetails._count.followers}
      followingCount={userWithDetails._count.following}
      postCount={userWithDetails._count.posts}
      activity={activityData}
    />
  );
}