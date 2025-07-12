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
type PostCardProps = {
  post: {
    id: string;
    content: string | null;
    image: string | null;
    createdAt: Date;
    author: User;
    isOwn: boolean;
    isLiked: boolean;
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

  const handleLike = () => {
    if (!isSignedIn) return toast.error("You must be signed in to like a post.");
    startTransition(() => toggleLike(post.id));
  };

  const handleDelete = () => {
    startTransition(() => deletePost(post.id));
  };

  const handleShare = async () => {
    const postUrl = `${window.location.origin}/post/${post.id}`;
    await navigator.clipboard.writeText(postUrl);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <Card className="mb-6 lg:mb-8 hover-lift bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
      <CardContent className="p-6 lg:p-8">
        <div className="flex items-start gap-4 lg:gap-6 mb-4 lg:mb-6">
          <Avatar className="h-12 w-12 lg:h-14 lg:w-14">
            <AvatarImage src={post.author.avatar || undefined} />
            <AvatarFallback>{post.author.name?.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2 lg:mb-3">
              <span className="font-bold text-base lg:text-lg truncate">{post.author.name}</span>
              <span className="text-muted-foreground text-sm lg:text-base">@{post.author.username}</span>
              <span className="text-muted-foreground text-sm lg:text-base">·</span>
              <span className="text-muted-foreground text-sm lg:text-base">{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="space-y-4">
              <div
                className="prose dark:prose-invert prose-sm sm:prose-base max-w-none"
                dangerouslySetInnerHTML={renderPostContent(post.content)}
              />
              {post.image && (
                 <div className="rounded-lg border overflow-hidden">
                    <img src={post.image} alt="Post image" className="w-full object-cover"/>
                 </div>
              )}
            </div>
          </div>
          {post.isOwn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-muted/50">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleDelete} className="text-destructive" disabled={isPending}>
                  Delete Post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className="flex items-center justify-between pt-4 lg:pt-6 border-t border-border/30">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            disabled={isPending}
            className={cn("text-muted-foreground flex-1", post.isLiked && "text-red-500")}
          >
            <Heart className={cn("h-5 w-5 mr-3", post.isLiked && "fill-current")} />
            <span className="text-sm lg:text-base font-semibold">{post._count.likes}</span>
          </Button>
          <Link href={`/post/${post.id}`} className="flex-1">
            <Button variant="ghost" size="sm" className="text-muted-foreground w-full">
              <MessageCircle className="h-5 w-5 mr-3" />
              <span className="text-sm lg:text-base font-semibold">{post._count.comments}</span>
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={handleShare} className="text-muted-foreground flex-1">
            {linkCopied ? <Check className="h-5 w-5 mr-3 text-green-500" /> : <Share className="h-5 w-5 mr-3" />}
            <span className="text-sm lg:text-base font-semibold">{linkCopied ? "Copied!" : "Share"}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}