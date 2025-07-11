"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Share, Send, Check } from "lucide-react"
import { ImageCarousel } from "@/components/image-carousel"
import { DataService } from "@/lib/data-service"
import { initializeMockData } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { AppSidebar } from "@/components/app-sidebar"
import { BottomNavigation } from "@/components/bottom-navigation"

function CommentItem({ comment, author }: { comment: any; author: any }) {
  return (
    <div className="flex gap-3 py-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={author?.image || "/placeholder.svg"} />
        <AvatarFallback>
          {author?.name
            ?.split(" ")
            .map((n: string) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm">{author?.name}</span>
          <span className="text-muted-foreground text-xs">@{author?.username}</span>
          <span className="text-muted-foreground text-xs">{DataService.formatTimeAgo(comment.createdAt)}</span>
        </div>
        <p className="text-sm mb-2">{comment.content}</p>
      </div>
    </div>
  )
}

export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState("")
  const [linkCopied, setLinkCopied] = useState(false)

  useEffect(() => {
    initializeMockData()
    loadPost()
  }, [params.id])

  const loadPost = () => {
    const postData = DataService.getPostWithAuthor(params.id)
    if (postData) {
      setPost(postData)
      const postComments = DataService.getPostComments(params.id)
      const users = DataService.getUsers()
      const commentsWithAuthors = postComments.map((comment) => ({
        ...comment,
        author: users.find((user) => user.id === comment.authorId),
      }))
      setComments(commentsWithAuthors)
    }
  }

  const handleLike = () => {
    DataService.toggleLike(params.id)
    loadPost()
  }

  const handleShare = async () => {
    const postUrl = `${window.location.origin}/post/${params.id}`
    try {
      await navigator.clipboard.writeText(postUrl)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
    }
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = DataService.createComment(params.id, newComment)
      const currentUser = DataService.getCurrentUser()
      const commentWithAuthor = { ...comment, author: currentUser }
      setComments([...comments, commentWithAuthor])
      setNewComment("")
      loadPost()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleAddComment()
    }
  }

  if (!post) return <div className="p-8">Post not found</div>

  return (
    <>
      <AppSidebar />

      <div className="min-h-screen bg-background pb-20 lg:pb-0 lg:pl-64">
        <div className="max-w-2xl mx-auto p-4 lg:p-8">
          <div className="mb-6">
            <div className="flex items-start gap-4 mb-6">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.author?.image || "/placeholder.svg"} />
                <AvatarFallback>
                  {post.author?.name
                    ?.split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-lg">{post.author?.name}</span>
                  <span className="text-muted-foreground">@{post.author?.username}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{DataService.formatTimeAgo(post.createdAt)}</span>
                </div>
              </div>
            </div>

            <p className="text-base leading-relaxed mb-6">{post.content}</p>

            {post.images && post.images.length > 0 && <ImageCarousel images={post.images} className="mb-6" />}

            <div className="flex items-center justify-between py-4 border-t border-b border-border">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={cn(
                  "text-muted-foreground hover:bg-red-50",
                  post.isLiked && "text-red-500 hover:text-red-600",
                )}
              >
                <Heart className={cn("h-4 w-4 mr-2", post.isLiked && "fill-current")} />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500 hover:bg-blue-50">
                <MessageCircle className="h-4 w-4 mr-2" />
                {post.comments}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-muted-foreground hover:text-green-500 hover:bg-green-50"
              >
                {linkCopied ? <Check className="h-4 w-4 mr-2" /> : <Share className="h-4 w-4 mr-2" />}
                {linkCopied ? "Copied!" : "Share"}
              </Button>
            </div>
          </div>

          <div>
            <div className="space-y-0 border-b border-border pb-6">
              {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} author={comment.author} />
              ))}
            </div>

            <div className="flex gap-4 pt-6">
              <Avatar className="h-10 w-10">
                <AvatarImage src={DataService.getCurrentUser()?.image || "/placeholder.svg"} />
                <AvatarFallback>YU</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-3">
                <Input
                  placeholder="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border-none bg-muted rounded-full px-4"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="h-10 w-10"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <BottomNavigation />
      </div>
    </>
  )
}
