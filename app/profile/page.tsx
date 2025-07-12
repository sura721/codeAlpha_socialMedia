 
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import ProfileClient from "@/components/ProfileClient";

export default async function ProfilePage() {
  const { userId } = await auth();
  if (!userId) {
    return notFound();
  }

  const userWithDetails = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
    include: {
      posts: {
         select: {
          id: true,
          image: true,
          content: true,
          createdAt: true, 
          updatedAt: true, 
          authorId: true,  
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      _count: {
        select: {
          followers: true,
          following: true,
        },
      },
    },
  });

  if (!userWithDetails) {
    return notFound();
  }

  // This will now be type-safe
  return (
    <ProfileClient
      user={userWithDetails}
      posts={userWithDetails.posts}
      followerCount={userWithDetails._count.followers}
      followingCount={userWithDetails._count.following}
    />
  );
}