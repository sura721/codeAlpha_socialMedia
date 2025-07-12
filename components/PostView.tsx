"use client";

import type React from "react";
import { useState, useTransition } from "react";
import type { Post, User, Comment as CommentType } from "@/lib/generated";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Share, Send, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { createComment, toggleLike } from "@/actions/post.actions";

interface PostViewProps {
  post: {
    id: string;
    content: string | null;
    image: string | null;
    createdAt: Date;
    author: User;
    comments: (CommentType & { author: User })[];
    isOwn: boolean;
    isLiked: boolean;
    _count: {
      likes: number;
      comments: number;
    };
  };
}

function CommentItem({ comment }: { comment: CommentType & { author: User } }) {
  return (
    <div className="flex gap-3 py-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.author.avatar || undefined} />
        <AvatarFallback>{comment.author.name?.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm">{comment.author.name}</span>
          <span className="text-muted-foreground text-xs">@{comment.author.username}</span>
        </div>
        <p className="text-sm mb-2">{comment.content}</p>
      </div>
    </div>
  );
}

export function PostView({ post }: PostViewProps) {
  const { isSignedIn, user } = useUser();
  const [isPending, startTransition] = useTransition();
  const [newComment, setNewComment] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);

  const handleLikeClick = () => {
    if (!isSignedIn) return toast.error("You must be signed in to like a post.");
    startTransition(() => {
      toggleLike(post.id).catch((err) => toast.error(err.message));
    });
  };

  const handleShareClick = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleCommentSubmit = () => {
    if (!isSignedIn) return toast.error("You must be signed in to comment.");
    if (!newComment.trim()) return;

    startTransition(() => {
      createComment(post.id, newComment)
        .then(() => {setNewComment("")
                        toast.success("Comment posted!");  

    })

        .catch((err) => toast.error(err.message));
    });
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="h-12 w-12">
            <AvatarImage src={post.author.avatar || undefined} />
            <AvatarFallback>{post.author.name?.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-lg">{post.author.name}</span>
              <span className="text-muted-foreground">@{post.author.username}</span>
            </div>
          </div>
        </div>

        <p className="text-base leading-relaxed mb-6 whitespace-pre-wrap">{post.content}</p>
        
        {post.image && <img src={post.image} alt="Post image" className="rounded-lg border mb-6 w-full" />}

        <div className="flex items-center justify-between py-4 border-t border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLikeClick}
            disabled={isPending}
            className={cn("text-muted-foreground hover:bg-red-50", post.isLiked && "text-red-500 hover:text-red-600")}
          >
            <Heart className={cn("h-4 w-4 mr-2", post.isLiked && "fill-current")} />
            {post._count.likes}
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500 hover:bg-blue-50">
            <MessageCircle className="h-4 w-4 mr-2" />
            {post._count.comments}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShareClick} className="text-muted-foreground hover:text-green-500 hover:bg-green-50">
            {linkCopied ? <Check className="h-4 w-4 mr-2" /> : <Share className="h-4 w-4 mr-2" />}
            {linkCopied ? "Copied!" : "Share"}
          </Button>
        </div>
      </div>
      <div>
        <div className="space-y-0 border-b border-border pb-6">
          {post.comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
        {isSignedIn && (
          <div className="flex gap-4 pt-6">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback>{user.firstName?.[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-3">
              <Input
                placeholder="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isPending}
                className="flex-1 border-none bg-muted rounded-full px-4"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCommentSubmit}
                disabled={!newComment.trim() || isPending}
                className="h-10 w-10"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}