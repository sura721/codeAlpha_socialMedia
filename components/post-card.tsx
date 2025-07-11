"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Share, Send, MoreHorizontal, Check, Sparkles } from "lucide-react"
import { ImageCarousel } from "@/components/image-carousel"
import { EditPostModal } from "@/components/edit-post-modal"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DataService } from "@/lib/data-service"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface PostCardProps {
  post: any
  onUpdate: () => void
  showComments?: boolean
}

function CommentItem({ comment, author }: { comment: any; author: any }) {
  return (
    <div className="flex gap-4 py-4 border-b border-border/30 last:border-b-0 hover:bg-muted/20 rounded-xl px-2 transition-colors">
      <Avatar className="h-10 w-10 ring-2 ring-purple-500/20">
        <AvatarImage src={author?.image || "/placeholder.svg"} />
        <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white font-semibold">
          {author?.name
            ?.split(" ")
            .map((n: string) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-sm">{author?.name}</span>
          <span className="text-muted-foreground text-xs">@{author?.username}</span>
          <span className="text-muted-foreground text-xs">·</span>
          <span className="text-muted-foreground text-xs">{DataService.formatTimeAgo(comment.createdAt)}</span>
        </div>
        <p className="text-sm leading-relaxed">{comment.content}</p>
      </div>
    </div>
  )
}

export function PostCard({ post, onUpdate, showComments = false }: PostCardProps) {
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [showPostComments, setShowPostComments] = useState(showComments)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<any[]>([])
  const [linkCopied, setLinkCopied] = useState(false)

  const handleLike = () => {
    DataService.toggleLike(post.id)
    onUpdate()
  }

  const handleDelete = () => {
    DataService.deletePost(post.id)
    onUpdate()
  }

  const handleShare = async () => {
    const postUrl = `${window.location.origin}/post/${post.id}`
    try {
      await navigator.clipboard.writeText(postUrl)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const toggleComments = () => {
    if (!showPostComments) {
      const postComments = DataService.getPostComments(post.id)
      const users = DataService.getUsers()
      const commentsWithAuthors = postComments.map((comment) => ({
        ...comment,
        author: users.find((user) => user.id === comment.authorId),
      }))
      setComments(commentsWithAuthors)
    }
    setShowPostComments(!showPostComments)
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = DataService.createComment(post.id, newComment)
      const currentUser = DataService.getCurrentUser()
      const commentWithAuthor = { ...comment, author: currentUser }
      setComments([...comments, commentWithAuthor])
      setNewComment("")
      onUpdate()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleAddComment()
    }
  }

  return (
    <>
      <Card className="mb-6 lg:mb-8 hover-lift bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
        <CardContent className="p-6 lg:p-8">
          <div className="flex items-start gap-4 lg:gap-6 mb-4 lg:mb-6">
            <div className="relative">
              <Avatar className="h-12 w-12 lg:h-14 lg:w-14 ring-2 ring-purple-500/20">
                <AvatarImage src={post.author?.image || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white font-bold text-lg">
                  {post.author?.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {post.author?.name === "Sarah Chen" && (
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2 lg:mb-3">
                <span className="font-bold text-base lg:text-lg truncate">{post.author?.name}</span>
                <span className="text-muted-foreground text-sm lg:text-base">@{post.author?.username}</span>
                <span className="text-muted-foreground text-sm lg:text-base">·</span>
                <span className="text-muted-foreground text-sm lg:text-base">
                  {DataService.formatTimeAgo(post.createdAt)}
                </span>
              </div>
              <Link href={`/post/${post.id}`}>
                <p className="text-base lg:text-lg leading-relaxed mb-4 lg:mb-6 font-medium">{post.content}</p>
                {post.images && post.images.length > 0 && (
                  <ImageCarousel images={post.images} className="mb-4 lg:mb-6 rounded-2xl overflow-hidden" />
                )}
              </Link>
            </div>
            {post.isOwn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-muted/50">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-morphism border-border/50">
                  <DropdownMenuItem onClick={() => setEditModalOpen(true)}>Edit Post</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDelete} className="text-destructive">
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
              className={cn(
                "text-muted-foreground hover:bg-red-50 dark:hover:bg-red-950/20 flex-1 rounded-2xl transition-colors",
                post.isLiked && "text-red-500 hover:text-red-600",
              )}
            >
              <Heart className={cn("h-5 w-5 mr-3", post.isLiked && "fill-current")} />
              <span className="text-sm lg:text-base font-semibold">{post.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleComments}
              className="text-muted-foreground hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 flex-1 rounded-2xl transition-colors"
            >
              <MessageCircle className="h-5 w-5 mr-3" />
              <span className="text-sm lg:text-base font-semibold">{post.comments}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-muted-foreground hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-950/20 flex-1 rounded-2xl transition-colors"
            >
              {linkCopied ? <Check className="h-5 w-5 mr-3 text-green-500" /> : <Share className="h-5 w-5 mr-3" />}
              <span className="text-sm lg:text-base font-semibold">{linkCopied ? "Copied!" : "Share"}</span>
            </Button>
          </div>

          {showPostComments && (
            <div className="mt-6 pt-6 border-t border-border/30">
              <div className="space-y-0 mb-6">
                {comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} author={comment.author} />
                ))}
              </div>

              <div className="flex gap-4">
                <Avatar className="h-10 w-10 ring-2 ring-purple-500/20">
                  <AvatarImage src={DataService.getCurrentUser()?.image || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white font-semibold">
                    YU
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-3">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 border-none bg-muted/50 rounded-2xl px-6 py-3 focus-visible:ring-2 focus-visible:ring-purple-500/50"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="h-12 w-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 disabled:opacity-50 disabled:bg-muted"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <EditPostModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        initialContent={post.content}
        initialImages={post.images}
        postId={post.id}
        onUpdate={onUpdate}
      />
    </>
  )
}
