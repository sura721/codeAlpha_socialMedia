"use client";

import type React from "react";
import { useState, useTransition } from "react";
import type { User } from "@/lib/generated";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Heart, MessageCircle, Share, MoreHorizontal, Check } from "lucide-react";
import { deletePost, toggleLike } from "@/actions/post.actions";
import { cn } from "@/lib/utils";
import { renderPostContent } from "@/utils/utils";
import { UserHoverCard } from "./UserHoverCard";
import { FollowButton } from "./FollowButton";

type PostCardProps = {
  post: {
    id: string;
    content: string | null;
    image: string | null;
    createdAt: Date;
    author: User;
    isOwn: boolean;
    isLiked: boolean;
    isFollowingAuthor: boolean;
    _count: {
      likes: number;
      comments: number;
    };
  };
};

export function PostCard({ post }: PostCardProps) {
  const { isSignedIn } = useUser();
  const [isPending, startTransition] = useTransition();
  const [linkCopied, setLinkCopied] = useState(false);
 
  const [optimisticState, setOptimisticState] = useState({
    isLiked: post.isLiked,
    likeCount: post._count.likes,
  });

  const handleLike = async () => {
    if (!isSignedIn) {
      toast.error("You must be signed in to like a post.");
      return;
    }
  
    setOptimisticState((currentState) => ({
      isLiked: !currentState.isLiked,
      likeCount: currentState.isLiked
        ? currentState.likeCount - 1
        : currentState.likeCount + 1,
    }));

     startTransition(() => {
      toggleLike(post.id).catch(() => {
        toast.error("Failed to update like. Please try again.");
        setOptimisticState({
          isLiked: post.isLiked,
          likeCount: post._count.likes,
        });
      });
    });
  };

  const handleDelete = () => {
    startTransition(() => {
      deletePost(post.id)
        .then(() => {
          toast.success("Post deleted.");
        })
        .catch((err) => {
          toast.error("Failed to delete post.");
        });
    });
  };

  const handleShare = async () => {
    const postUrl = `${window.location.origin}/post/${post.id}`;
    await navigator.clipboard.writeText(postUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <Card className="border-x-0 border-t-0 rounded-none first:border-t mb-0 bg-transparent shadow-none hover-lift-none">
      <CardContent className="p-4 lg:p-6">
        <div className="flex items-start gap-3 lg:gap-4">
          <UserHoverCard user={post.author} isFollowing={post.isFollowingAuthor} isOwn={post.isOwn}>
            <Link href={`/profile/${post.author.username}`}>
              <Avatar className="h-10 w-10 lg:h-12 lg:w-12">
                <AvatarImage src={post.author.avatar || undefined} />
                <AvatarFallback>{post.author.name?.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
              </Avatar>
            </Link>
          </UserHoverCard>

          <div className="flex-1">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm flex-wrap">
                    <UserHoverCard user={post.author} isFollowing={post.isFollowingAuthor} isOwn={post.isOwn}>
                        <Link href={`/profile/${post.author.username}`} className="font-bold hover:underline">
                            {post.author.name}
                        </Link>
                    </UserHoverCard>
                    <span className="text-muted-foreground">@{post.author.username}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                
                <div className="ml-auto">
                    {post.isOwn ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleDelete} className="text-destructive" disabled={isPending}>
                            Delete Post
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    ) : (
                      // THE FOLLOW BUTTON IS NOW RESTORED
                      isSignedIn && <FollowButton userIdToFollow={post.author.id} isFollowing={post.isFollowingAuthor} />
                    )}
                </div>
            </div>
            
            <div className="mt-2 space-y-3">
              <div
                className="prose dark:prose-invert prose-sm max-w-none break-words"
                dangerouslySetInnerHTML={renderPostContent(post.content)}
              />
              {post.image && (
                 <div className="rounded-xl border overflow-hidden aspect-video">
                    <img src={post.image} alt="Post image" className="w-full h-full object-cover"/>
                 </div>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-4 -ml-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                disabled={isPending}
                className={cn("text-muted-foreground rounded-full", optimisticState.isLiked && "text-red-500")}
              >
                <Heart className={cn("h-5 w-5 mr-2", optimisticState.isLiked && "fill-current")} />
                <span className="text-sm font-semibold">{optimisticState.likeCount}</span>
              </Button>
              <Link href={`/post/${post.id}`}>
                <Button variant="ghost" size="sm" className="text-muted-foreground rounded-full">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm font-semibold">{post._count.comments}</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleShare} className="text-muted-foreground rounded-full">
                {linkCopied ? <Check className="h-5 w-5 mr-2 text-green-500" /> : <Share className="h-5 w-5 mr-2" />}
                <span className="text-sm font-semibold">{linkCopied ? "Copied" : "Share"}</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}