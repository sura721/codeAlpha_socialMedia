"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath, revalidateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { Prisma } from "@/lib/generated";


export async function toggleFollow(userIdToFollow: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("User not authenticated");

  const currentUser = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true, username: true }
  });

  if (!currentUser) throw new Error("Current user not found in database");
  if (currentUser.id === userIdToFollow) throw new Error("You cannot follow yourself");

  const userToFollow = await prisma.user.findUnique({
    where: { id: userIdToFollow },
    select: { username: true }
  });
  if (!userToFollow) throw new Error("User to follow not found");

  const existingFollow = await prisma.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: currentUser.id,
        followingId: userIdToFollow,
      },
    },
  });

  if (existingFollow) {
    await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: userIdToFollow,
        },
      },
    });
  } else {
    await prisma.follows.create({
      data: {
        followerId: currentUser.id,
        followingId: userIdToFollow,
      },
    });
  }

 
  revalidateTag(`profile:${userToFollow.username}`);
  
   revalidateTag(`profile:${currentUser.username}`);
  
   revalidateTag('explore-users');  
   revalidatePath('/')
  
 
}

export async function getFollowers(profileUserId: string, currentUserId?: string | null) {
 
  const follows = await prisma.follows.findMany({
    where: {
      followingId: profileUserId,
    },
     select: {
      follower: {
        select: {
          id: true,
          name: true,
          username: true,
          bio: true,
          avatar: true,
        },
      },
    },
  });

   const followers = follows.map(follow => follow.follower);

   if (!currentUserId) {
    return followers.map(user => ({ ...user, following: false }));
  }

   const followerIds = followers.map(user => user.id);

   const followingRelationships = await prisma.follows.findMany({
    where: {
      followerId: currentUserId,
      followingId: {
        in: followerIds,
      },
    },
    select: {
      followingId: true,  
    },
  });

   const followingIdSet = new Set(followingRelationships.map(f => f.followingId));

   return followers.map(user => ({
    ...user,
     following: followingIdSet.has(user.id),
  }));
}


 export async function getFollowing(profileUserId: string, currentUserId?: string | null) {
  
  const follows = await prisma.follows.findMany({
    where: {
      followerId: profileUserId,
    },
     select: {
      following: {
        select: {
          id: true,
          name: true,
          username: true,
          bio: true,
          avatar: true,
        },
      },
    },
  });

  const followingUsers = follows.map(follow => follow.following);
  
   if (!currentUserId) {
    return followingUsers.map(user => ({ ...user, following: false }));
  }
  
   const followingIds = followingUsers.map(user => user.id);

   const followingRelationships = await prisma.follows.findMany({
    where: {
      followerId: currentUserId,
      followingId: {
        in: followingIds,
      },
    },
    select: {
      followingId: true,
    },
  });

  const followingIdSet = new Set(followingRelationships.map(f => f.followingId));

   return followingUsers.map(user => ({
    ...user,
     following: followingIdSet.has(user.id),
  }));
}