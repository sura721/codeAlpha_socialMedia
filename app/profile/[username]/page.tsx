 
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

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default async function UserProfilePage({ params }: ProfilePageProps) {
  const userWithDetails = await prisma.user.findUnique({
    where: { username: params.username },
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
  });

  if (!userWithDetails) {
    notFound();
  }

  const { userId: loggedInClerkId } =await auth();
  const isOwnProfile = loggedInClerkId ? userWithDetails.clerkId === loggedInClerkId : false;

  const [commentsReceivedCount, recentComments] = await Promise.all([
    prisma.comment.count({
      where: { post: { authorId: userWithDetails.id } },
    }),
    prisma.comment.findMany({
      where: { authorId: userWithDetails.id },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        post: { select: { id: true, content: true, image: true } },
      },
    }),
  ]);

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
      isOwnProfile={isOwnProfile}
    />
  );
}