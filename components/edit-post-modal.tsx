"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, X } from "lucide-react"
import { DataService } from "@/lib/data-service"

interface EditPostModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialContent?: string
  initialImages?: string[]
  postId: string
  onUpdate: () => void
}

export function EditPostModal({
  open,
  onOpenChange,
  initialContent = "",
  initialImages = [],
  postId,
  onUpdate,
}: EditPostModalProps) {
  const [content, setContent] = useState(initialContent)
  const [images, setImages] = useState<string[]>(initialImages)

  const handleSave = () => {
    DataService.updatePost(postId, {
      content,
      images: images.length > 0 ? images : undefined,
    })
    onUpdate()
    onOpenChange(false)
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImages((prev) => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            rows={4}
          />

          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Image ${index + 1}`}
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

          <div className="flex items-center justify-between">
            <label htmlFor="edit-image-upload" className="cursor-pointer">
              <ImageIcon className="h-5 w-5 text-primary hover:text-primary/80" />
              <input
                id="edit-image-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
