"use client";

import { useState } from "react";
import type { User, Post } from "@/lib/generated";
import type { ActivityData } from "@/app/profile/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/bottom-navigation";
import { EditProfileModal } from "@/components/edit-profile-modal";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import { MapPin, Link as LinkIcon, Calendar, Sparkles, Crown, Star, ImageOff, Heart, MessageSquare, MessagesSquare } from "lucide-react";
import { renderPostContent } from "@/utils/utils";

type ProfileClientProps = {
  user: User & { posts: Post[] };
  posts: Post[];
  followerCount: number;
  followingCount: number;
  postCount: number;
  activity: ActivityData;
  isOwnProfile: boolean; 
};

const StatCard = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: number | string }) => (
    <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-3xl p-6 flex items-center gap-5 shadow-lg">
        <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-2xl">
            <Icon className="h-7 w-7 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
            <p className="text-3xl font-bold text-gradient">{value}</p>
            <p className="text-sm font-semibold text-muted-foreground">{label}</p>
        </div>
    </div>
);

const ActivityView = ({ activity }: { activity: ActivityData }) => (
    <div className="grid grid-cols-1 gap-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard icon={Heart} label="Likes Given" value={activity.likesGiven} />
            <StatCard icon={MessageSquare} label="Comments Written" value={activity.commentsWritten} />
            <StatCard icon={MessagesSquare} label="Comments Received" value={activity.commentsReceived} />
        </div>
        <div>
            <h3 className="text-2xl font-bold text-gradient mb-6">Recent Comments</h3>
            <div className="flex flex-col gap-4">
                {activity.recentComments.length > 0 ? (
                    activity.recentComments.map(comment => (
                        <Link href={`/post/${comment.post.id}`} key={comment.id} className="block bg-white/50 dark:bg-gray-900/50 p-4 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-900/80 transition-colors shadow-md">
                            <p className="text-muted-foreground mb-2">You commented:</p>
                            <blockquote className="border-l-4 border-purple-500 pl-4 font-medium text-foreground">
                                {comment.content}
                            </blockquote>
                        </Link>
                    ))
                ) : (
                    <p className="text-muted-foreground text-center py-8">You haven't commented on any posts yet.</p>
                )}
            </div>
        </div>
    </div>
);

const PostGrid = ({ posts }: { posts: Post[] }) => {
  if (posts.length === 0) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16">
        <ImageOff className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold text-foreground">No Posts Yet</h3>
        <p className="mt-2 text-sm text-muted-foreground">When you create posts, they'll appear here.</p>
      </div>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <Link href={`/post/${post.id}`} key={post.id} className="block group">
          <div className="aspect-square rounded-3xl overflow-hidden hover-lift cursor-pointer relative">
          {post.image &&   <img
              src={post.image || "/placeholder.svg"}
              alt={post.content || `Post ${post.id}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              {post.content && (
                <div className="text-white text-sm line-clamp-2"> 
                    <div
                        className="prose dark:prose-invert prose-sm sm:prose-base max-w-none"
                        dangerouslySetInnerHTML={renderPostContent(post.content)}
                    />
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default function ProfileClient({ user, posts, followerCount, followingCount, postCount, activity,isOwnProfile }: ProfileClientProps) {
  const [activeTab, setActiveTab] = useState("Posts");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const TABS = ["Posts", "Activity"];

  return (
    <>
      <AppSidebar />

      <div className="hidden lg:block min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20 lg:pl-72">
        <div className="max-w-5xl mx-auto p-8">
          <div className="relative mb-12">
            <div className="h-64 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute top-6 right-6">
                {isOwnProfile &&<Button onClick={() => setEditModalOpen(true)} className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 rounded-2xl px-6">Edit Profile</Button>}
              </div>
            </div>
            <div className="relative -mt-20 px-8">
              <div className="flex flex-col lg:flex-row lg:items-end gap-6">
                <div className="relative">
                  <Avatar className="h-40 w-40 ring-8 ring-white dark:ring-gray-900 shadow-2xl">
                    <AvatarImage src={user.avatar || undefined} />
                    <AvatarFallback className="text-6xl bg-gradient-to-br from-purple-400 to-pink-400 text-white font-bold">{user.name?.split(" ").map((n) => n[0]).join("").toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg"><Crown className="h-6 w-6 text-white" /></div>
                </div>
                <div className="flex-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-4xl font-bold text-gradient">{user.name}</h1>
                    <Sparkles className="h-6 w-6 text-yellow-500" />
                  </div>
                  <p className="text-xl text-muted-foreground mb-6 font-medium">{user.bio}</p>
                  <div className="flex flex-wrap gap-6 text-muted-foreground mb-6">
                    {user.location && <div className="flex items-center gap-2"><MapPin className="h-5 w-5 text-purple-500" /><span className="font-medium">{user.location}</span></div>}
                    {user.website && <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-purple-500 hover:text-purple-600 transition-colors"><LinkIcon className="h-5 w-5" /><span className="font-medium hover:underline">{user.website}</span></a>}
                    <div className="flex items-center gap-2"><Calendar className="h-5 w-5 text-purple-500" /><span className="font-medium">Joined {new Date(user.createdAt).getFullYear()}</span></div>
                  </div>
                  <div className="flex items-baseline justify-start gap-8">
                    <div className="flex flex-col items-center"><p className="text-3xl font-bold text-gradient leading-none">{postCount}</p><p className="text-muted-foreground font-semibold mt-1">Posts</p></div>
                    <Link href={`/followers/${user.username}`} className="flex flex-col items-center hover:bg-muted/50 rounded-2xl p-4 transition-colors group"><p className="text-3xl font-bold text-gradient group-hover:scale-110 transition-transform leading-none">{followerCount}</p><p className="text-muted-foreground font-semibold mt-1">Followers</p></Link>
                    <Link href={`/following/${user.username}`}  className="flex flex-col items-center hover:bg-muted/50 rounded-2xl p-4 transition-colors group"><p className="text-3xl font-bold text-gradient group-hover:scale-110 transition-transform leading-none">{followingCount}</p><p className="text-muted-foreground font-semibold mt-1">Following</p></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center border-b border-border/50 mb-12">
            {TABS.map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={cn("px-12 py-6 text-lg font-bold border-b-4 transition-all duration-300 relative", activeTab === tab ? "border-purple-500 text-purple-500 bg-purple-50 dark:bg-purple-950/20 rounded-t-2xl" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-t-2xl")}>{tab}{activeTab === tab && (<Star className="absolute -top-2 left-1/2 transform -translate-x-1/2 h-4 w-4 text-yellow-500" />)}</button>))}
          </div>
          {activeTab === 'Posts' && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><PostGrid posts={posts} /></div>)}
          {activeTab === 'Activity' && (<ActivityView activity={activity} />)}
        </div>
      </div>

      <div className="lg:hidden min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20 pb-20">
        <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50"><div className="flex items-center justify-center p-6"><h1 className="text-xl font-bold text-gradient">Profile</h1></div></div>
        <div className="max-w-md mx-auto">
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>
            <div className="relative -mt-12 px-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <Avatar className="h-24 w-24 ring-4 ring-white dark:ring-gray-900 shadow-xl"><AvatarImage src={user.avatar || undefined} /><AvatarFallback className="text-2xl bg-gradient-to-br from-purple-400 to-pink-400 text-white font-bold">{user.name?.split(" ").map((n) => n[0]).join("").toUpperCase()}</AvatarFallback></Avatar>
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1"><Crown className="h-4 w-4 text-white" /></div>
                </div>
                <div className="mt-4 mb-6">
                  <h1 className="text-2xl font-bold text-gradient mb-2">{user.name}</h1>
                  <p className="text-muted-foreground text-sm mb-2 font-medium">{user.bio}</p>
                  {user.location && <p className="text-muted-foreground text-xs mb-2">{user.location}</p>}
                  <p className="text-muted-foreground text-xs">Joined {new Date(user.createdAt).getFullYear()}</p>
                </div>
               {isOwnProfile && <Button onClick={() => setEditModalOpen(true)} className="w-full mb-8 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-all duration-300">Edit Profile</Button>}
                <div className="flex items-baseline justify-center gap-8 mb-8">
                  <div className="flex flex-col items-center"><p className="text-2xl font-bold text-gradient leading-none">{postCount}</p><p className="text-xs text-muted-foreground font-semibold mt-1">Posts</p></div>
                  <Link href={`/followers/${user.username}`} className="flex flex-col items-center hover:bg-muted/50 rounded-xl p-3 transition-colors"><p className="text-2xl font-bold text-gradient leading-none">{followerCount}</p><p className="text-xs text-muted-foreground font-semibold mt-1">Followers</p></Link>
                  <Link href={`/following/${user.username}`} className="flex flex-col items-center hover:bg-muted/50 rounded-xl p-3 transition-colors"><p className="text-2xl font-bold text-gradient leading-none">{followingCount}</p><p className="text-xs text-muted-foreground font-semibold mt-1">Following</p></Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex border-b border-border/50 mx-4">
            {TABS.map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={cn("flex-1 py-4 text-sm font-bold border-b-2 transition-all duration-300", tab === activeTab ? "border-purple-500 text-purple-500" : "border-transparent text-muted-foreground hover:text-foreground")}>{tab}</button>))}
          </div>
          <div className="p-4">
            {activeTab === 'Posts' && (<div className="grid grid-cols-2 sm:grid-cols-3 gap-3"><PostGrid posts={posts} /></div>)}
            {activeTab === 'Activity' && (<ActivityView activity={activity} />)}
          </div>
        </div>
        <BottomNavigation />
      </div>

      {isOwnProfile && <EditProfileModal open={editModalOpen} onOpenChange={setEditModalOpen} user={user} />}isOwn
    </>
  );
}