'use server';
import prisma from "@/lib/prisma";
import { searchUsersAndTags } from "@/lib/data-service";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/**
 * Action to follow a user.
 */
export async function followUserAction(targetUserId: string) {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Client not authenticated");

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
    select: { id: true }
  });

  if (!dbUser) throw new Error("Authenticated user not found in DB");
  if (dbUser.id === targetUserId) throw new Error("Cannot follow yourself");

  await prisma.follows.create({
    data: {
      followerId: dbUser.id,
      followingId: targetUserId,
    },
  });

  revalidatePath("/explore");
}

/**
 * Action to perform a search.
 */
export async function searchAction(query: string) {
    if (!query) {
        return { users: [], tags: [] };
    }
     const results = await searchUsersAndTags(query, 5);
    return results;
}