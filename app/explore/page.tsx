import { getSuggestedUsers, getTrendingTags } from "@/lib/data-service";
import { ExploreClientPage } from "./explore-client-page";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import React from "react";

export const revalidate = 60;  
export default async function ExplorePage() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
 
    const tags = await getTrendingTags(6);
    return <ExploreClientPage initialTags={tags} initialUsers={[]} />;
  }

   const dbUser = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
    select: { id: true }
  });

   if (!dbUser) {
      const tags = await getTrendingTags(6);
      return <ExploreClientPage initialTags={tags} initialUsers={[]} />;
  }
 
  const [tags, users] = await Promise.all([
    getTrendingTags(6),
    getSuggestedUsers(dbUser.id, 3)
  ]);
  
  return <ExploreClientPage initialTags={tags} initialUsers={users} />;
}