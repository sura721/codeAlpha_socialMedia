"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, MapPin, Smile, X } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { AppSidebar } from "@/components/app-sidebar"

export default function CreatePage() {
  const [postContent, setPostContent] = useState("")
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [location, setLocation] = useState("")
  const [showLocationInput, setShowLocationInput] = useState(false)

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

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const addEmoji = (emoji: string) => {
    setPostContent((prev) => prev + emoji)
  }

  return (
    <>
      <AppSidebar />

       <div className="hidden lg:block min-h-screen bg-background lg:pl-64">
        <div className="max-w-2xl mx-auto p-8">
          <h1 className="text-2xl font-bold mb-8">Create Post</h1>

          <div className="flex gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" />
              <AvatarFallback>YU</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-6 ">
              <Textarea
                placeholder="What's happening?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="border-none resize-none text-lg placeholder:text-muted-foreground focus-visible:ring-0 p-0 min-h-[150px] bg-transparent px-10"
              />

              {selectedImages.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Selected ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 bg-black/50 hover:bg-black/70 text-white border-none"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {showLocationInput && (
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <MapPin className="h-4 w-4 text-primary" />
                  <input
                    type="text"
                    placeholder="Add location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-sm"
                  />
                  <Button variant="ghost" size="sm" onClick={() => setShowLocationInput(false)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              <div className="flex items-center justify-between pt-6 border-t border-border">
                <div className="flex items-center gap-4">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <ImageIcon className="h-6 w-6 text-primary hover:text-primary/80" />
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                    onClick={() => setShowLocationInput(!showLocationInput)}
                  >
                    <MapPin className="h-5 w-5 text-primary" />
                  </Button>
                  <div className="relative">
                    <Button variant="ghost" size="icon" className="h-10 w-10">
                      <Smile className="h-5 w-5 text-primary" />
                    </Button>
                    <div className="absolute top-12 left-0 bg-background border border-border rounded-lg p-2 shadow-lg hidden group-hover:block">
                      <div className="grid grid-cols-5 gap-1">
                        {["😀", "😂", "😍", "🤔", "👍", "❤️", "🎉", "🔥", "💯", "🚀"].map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => addEmoji(emoji)}
                            className="p-1 hover:bg-muted rounded text-lg"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Button disabled={!postContent.trim()} className="rounded-full px-8">
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen bg-background pb-20">
        <div className="sticky top-0 z-40 bg-background border-b border-border">
          <div className="flex items-center justify-between p-4">
            <Button variant="ghost" size="sm">
              Cancel
            </Button>
            <h1 className="text-lg font-semibold">Create Post</h1>
            <Button disabled={!postContent.trim()} size="sm" className="rounded-full">
              Post
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>YU</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <Textarea
                placeholder="What's happening?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="border-none resize-none text-base placeholder:text-muted-foreground focus-visible:ring-0 p-0 min-h-[100px]"
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
                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 bg-black/50 hover:bg-black/70 text-white border-none"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {showLocationInput && (
                <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                  <MapPin className="h-4 w-4 text-primary" />
                  <input
                    type="text"
                    placeholder="Add location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-sm"
                  />
                  <Button variant="ghost" size="sm" onClick={() => setShowLocationInput(false)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                  <label htmlFor="image-upload-mobile" className="cursor-pointer">
                    <ImageIcon className="h-5 w-5 text-primary hover:text-primary/80" />
                    <input
                      id="image-upload-mobile"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setShowLocationInput(!showLocationInput)}
                  >
                    <MapPin className="h-4 w-4 text-primary" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Smile className="h-4 w-4 text-primary" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BottomNavigation />
      </div>
    </>
  )
}
