"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ImageIcon } from "lucide-react"
import { PostCard } from "@/components/post-card"
import { AppSidebar } from "@/components/app-sidebar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { DataService } from "@/lib/data-service"
import { initializeMockData } from "@/lib/mock-data"

function CreatePostCard({ onPostCreated }: { onPostCreated: () => void }) {
  const [postContent, setPostContent] = useState("")
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [isPosting, setIsPosting] = useState(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImages((prev) => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const handlePost = async () => {
    if (postContent.trim()) {
      setIsPosting(true)
      DataService.createPost(postContent, selectedImages.length > 0 ? selectedImages : undefined)
      setPostContent("")
      setSelectedImages([])
      setIsPosting(false)
      onPostCreated()
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4 lg:p-6">
        <div className="flex gap-3 lg:gap-4">
          <Avatar className="h-10 w-10 lg:h-12 lg:w-12">
            <AvatarImage src="/placeholder.svg?height=48&width=48" />
            <AvatarFallback>YU</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3 lg:space-y-4">
            <Input
              placeholder="What's happening?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="border-none text-base lg:text-lg placeholder:text-muted-foreground focus-visible:ring-0 p-0 h-auto bg-transparent"
              disabled={isPosting}
            />
            {selectedImages.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative rounded-lg overflow-hidden">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Selected ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between">
              <label htmlFor="image-upload" className="cursor-pointer">
                <ImageIcon className="h-5 w-5 text-primary hover:text-primary/80" />
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isPosting}
                />
              </label>
              <Button
                disabled={!postContent.trim() || isPosting}
                onClick={handlePost}
                className="rounded-full px-4 lg:px-6"
              >
                {isPosting ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = () => {
    initializeMockData()
    const postsWithAuthors = DataService.getPostsWithAuthors()
    setPosts(postsWithAuthors)
  }

  return (
    <>
      <AppSidebar />

      {/* Main content with proper spacing for desktop sidebar */}
      <div className="min-h-screen bg-background pb-20 lg:pb-0 lg:pl-72">
        <div className="max-w-2xl mx-auto p-4 lg:p-8">
          <CreatePostCard onPostCreated={loadPosts} />
          <div className="space-y-0">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onUpdate={loadPosts} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <div className="lg:hidden">
        <BottomNavigation />
      </div>
    </>
  )
}
