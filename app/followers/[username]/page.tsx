 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { BottomNavigation } from "@/components/bottom-navigation";
import { MobileHeader } from "@/components/mobile-header";
import { AppSidebar } from "@/components/app-sidebar";
import { FollowButton } from "@/components/FollowButton";  
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { getFollowers } from "@/actions/user.actions";
import { notFound } from "next/navigation";
import Link from "next/link";

 type FollowerUser = {
  id: string;
  name: string | null;
  username: string;
  bio: string | null;
  avatar: string | null;
  following: boolean; 
};

function FollowerCard({ user }: { user: FollowerUser }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <Link href={`/profile/${user.username}`} className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar || undefined} />
              <AvatarFallback>
                {user.name?.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold hover:underline">{user.name}</p>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{user.bio}</p>
            </div>
          </Link>
          <FollowButton userIdToFollow={user.id} isFollowing={user.following} />
        </div>
      </CardContent>
    </Card>
  );
}

export default async function FollowersPage({ params }: { params: { username: string } }) {
  const { userId: clerkId } =await auth();

   const loggedInUser = clerkId ? await prisma.user.findUnique({ 
    where: { clerkId }, 
    select: { id: true } 
  }) : null;
  
   const profileUser = await prisma.user.findUnique({
    where: { username: params.username },
    select: { id: true, name: true }
  });

  if (!profileUser) {
    return notFound();
  }

   const followers = await getFollowers(profileUser.id, loggedInUser?.id);

  const pageTitle = `People following ${profileUser.name}`;

  return (
    <>
      <AppSidebar />

       <div className="hidden lg:block min-h-screen bg-background lg:pl-72">
        <div className="max-w-2xl mx-auto p-8">
          <h1 className="text-2xl font-bold mb-6">{pageTitle}</h1>
          {followers.length > 0 ? (
            <div className="space-y-4">
              {followers.map((user) => (
                <FollowerCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center mt-10">This user doesn't have any followers yet.</p>
          )}
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden min-h-screen bg-background pb-20">
        <MobileHeader title={pageTitle} showBack />
        <div className="p-4">
          {followers.length > 0 ? (
            <div className="space-y-3">
              {followers.map((user) => (
                <FollowerCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center mt-10">This user doesn't have any followers yet.</p>
          )}
        </div>
        <BottomNavigation />
      </div>
    </>
  );
}