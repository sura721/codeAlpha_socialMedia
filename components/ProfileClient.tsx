 
"use client";

import { useState } from "react";
import type { User, Post } from "@/lib/generated";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/bottom-navigation";
import { EditProfileModal } from "@/components/edit-profile-modal";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import { MapPin, LinkIcon, Calendar, Sparkles, Crown, Star } from "lucide-react";

type ProfileClientProps = {
  user: User;
  posts: Post[];
  followerCount: number;
  followingCount: number;
};

export default function ProfileClient({ user, posts, followerCount, followingCount }: ProfileClientProps) {
  const [activeTab, setActiveTab] = useState("Posts");
  const [editModalOpen, setEditModalOpen] = useState(false);

  

  return (
    <>
      <AppSidebar />

       <div className="hidden lg:block min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20 lg:pl-72">
        <div className="max-w-5xl mx-auto p-8">
          <div className="relative mb-12">
            <div className="h-64 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-6 right-6">
                <Button
                  onClick={() => setEditModalOpen(true)}
                  className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 rounded-2xl px-6"
                >
                  Edit Profile
                </Button>
              </div>
            </div>

            <div className="relative -mt-20 px-8">
              <div className="flex flex-col lg:flex-row lg:items-end gap-6">
                <div className="relative">
                  <Avatar className="h-40 w-40 ring-8 ring-white dark:ring-gray-900 shadow-2xl">
                    <AvatarImage src={user.avatar || undefined} />
                    <AvatarFallback className="text-6xl bg-gradient-to-br from-purple-400 to-pink-400 text-white font-bold">
                      {user.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="flex-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-4xl font-bold text-gradient">{user.name}</h1>
                    <Sparkles className="h-6 w-6 text-yellow-500" />
                  </div>

                  <p className="text-xl text-muted-foreground mb-6 font-medium">{user.bio}</p>

                  <div className="flex flex-wrap gap-6 text-muted-foreground mb-6">
                    {user.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-purple-500" />
                        <span className="font-medium">{user.location}</span>
                      </div>
                    )}
                    {user.website && (
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-purple-500 hover:text-purple-600 transition-colors"
                      >
                        <LinkIcon className="h-5 w-5" />
                        <span className="font-medium hover:underline">{user.website}</span>
                      </a>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-purple-500" />
                      <span className="font-medium">Joined {new Date(user.createdAt).getFullYear()}</span>
                    </div>
                  </div>

                  <div className="flex items-baseline justify-start gap-8">
                    <div className="flex flex-col items-center">
                      <p className="text-3xl font-bold text-gradient leading-none">{posts.length}</p>
                      <p className="text-muted-foreground font-semibold mt-1">Posts</p>
                    </div>
                    <Link
                      href="/followers"
                      className="flex flex-col items-center hover:bg-muted/50 rounded-2xl p-4 transition-colors group"
                    >
                      <p className="text-3xl font-bold text-gradient group-hover:scale-110 transition-transform leading-none">
                        {followerCount}
                      </p>
                      <p className="text-muted-foreground font-semibold mt-1">Followers</p>
                    </Link>
                    <Link
                      href="/following"
                      className="flex flex-col items-center hover:bg-muted/50 rounded-2xl p-4 transition-colors group"
                    >
                      <p className="text-3xl font-bold text-gradient group-hover:scale-110 transition-transform leading-none">
                        {followingCount}
                      </p>
                      <p className="text-muted-foreground font-semibold mt-1">Following</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center border-b border-border/50 mb-12">
            {["Posts", "Highlights"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-12 py-6 text-lg font-bold border-b-4 transition-all duration-300 relative",
                  activeTab === tab
                    ? "border-purple-500 text-purple-500 bg-purple-50 dark:bg-purple-950/20 rounded-t-2xl"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-t-2xl",
                )}
              >
                {tab}
                {activeTab === tab && (
                  <Star className="absolute -top-2 left-1/2 transform -translate-x-1/2 h-4 w-4 text-yellow-500" />
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="aspect-square rounded-3xl overflow-hidden hover-lift cursor-pointer group relative"
              >
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.content || `Post ${post.id}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

       <div className="lg:hidden min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20 pb-20">
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
          <div className="flex items-center justify-center p-6">
            <h1 className="text-xl font-bold text-gradient">Profile</h1>
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>
            <div className="relative -mt-12 px-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <Avatar className="h-24 w-24 ring-4 ring-white dark:ring-gray-900 shadow-xl">
                    <AvatarImage src={user.avatar || undefined} />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-400 to-pink-400 text-white font-bold">
                      {user.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1">
                    <Crown className="h-4 w-4 text-white" />
                  </div>
                </div>

                <div className="mt-4 mb-6">
                  <h1 className="text-2xl font-bold text-gradient mb-2">{user.name}</h1>
                  <p className="text-muted-foreground text-sm mb-2 font-medium">{user.bio}</p>
                  {user.location && <p className="text-muted-foreground text-xs mb-2">{user.location}</p>}
                  <p className="text-muted-foreground text-xs">Joined {new Date(user.createdAt).getFullYear()}</p>
                </div>

                <Button
                  onClick={() => setEditModalOpen(true)}
                  className="w-full mb-8 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-all duration-300"
                >
                  Edit Profile
                </Button>

                <div className="flex items-baseline justify-center gap-8 mb-8">
                  <div className="flex flex-col items-center">
                    <p className="text-2xl font-bold text-gradient leading-none">{posts.length}</p>
                    <p className="text-xs text-muted-foreground font-semibold mt-1">Posts</p>
                  </div>
                  <Link
                    href="/followers"
                    className="flex flex-col items-center hover:bg-muted/50 rounded-xl p-3 transition-colors"
                  >
                    <p className="text-2xl font-bold text-gradient leading-none">{followerCount}</p>
                    <p className="text-xs text-muted-foreground font-semibold mt-1">Followers</p>
                  </Link>
                  <Link
                    href="/following"
                    className="flex flex-col items-center hover:bg-muted/50 rounded-xl p-3 transition-colors"
                  >
                    <p className="text-2xl font-bold text-gradient leading-none">{followingCount}</p>
                    <p className="text-xs text-muted-foreground font-semibold mt-1">Following</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex border-b border-border/50 mx-4">
            {["Posts", "Highlights"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex-1 py-4 text-sm font-bold border-b-2 transition-all duration-300",
                  activeTab === tab
                    ? "border-purple-500 text-purple-500"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {posts.map((post) => (
                <div key={post.id} className="aspect-square rounded-2xl overflow-hidden hover-lift">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.content || `Post ${post.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <BottomNavigation />
      </div>

       <EditProfileModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        user={user}
      />
    </>
  );
}