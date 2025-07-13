"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { Prisma } from "@/lib/generated";

export async function toggleFollow(userIdToFollow: string) {
  const { userId: clerkId } =await auth();
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

  revalidatePath("/");
  revalidatePath("/explore");
  revalidatePath(`/profile/${userToFollow.username}`);
  revalidatePath(`/profile/${currentUser.username}`);
}