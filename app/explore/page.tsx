import { getSuggestedUsers, getTrendingTags } from "@/lib/data-service";
import { ExploreClientPage } from "./explore-client-page";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import React from "react";

export const revalidate = 60; // Optional: Revalidate the data every 60 seconds

export default async function ExplorePage() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    // If user is not signed in, they can still see the page,
    // but the "Who to follow" section will be empty.
    const tags = await getTrendingTags(6);
    return <ExploreClientPage initialTags={tags} initialUsers={[]} />;
  }

  // Find the user in your database corresponding to the logged-in Clerk user
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
    select: { id: true }
  });

  // If the user is logged in but not in our DB yet, they can't follow anyone.
  if (!dbUser) {
      const tags = await getTrendingTags(6);
      return <ExploreClientPage initialTags={tags} initialUsers={[]} />;
  }

  // Fetch initial data in parallel for best performance
  // We fetch tags and suggested users for the logged-in user.
  const [tags, users] = await Promise.all([
    getTrendingTags(6),
    getSuggestedUsers(dbUser.id, 3)
  ]);
  
  return <ExploreClientPage initialTags={tags} initialUsers={users} />;
}