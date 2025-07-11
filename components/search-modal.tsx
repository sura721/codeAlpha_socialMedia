"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const searchResults = [
  { type: "user", name: "Sarah Chen", username: "@sarahc", avatar: "/placeholder.svg?height=32&width=32" },
  { type: "user", name: "Alex Rivera", username: "@alexr", avatar: "/placeholder.svg?height=32&width=32" },
  { type: "hashtag", name: "#technology", posts: "12.5K posts" },
  { type: "hashtag", name: "#design", posts: "8.2K posts" },
]

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for people, posts, or hashtags..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {query && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {searchResults
                .filter(
                  (result) =>
                    result.name.toLowerCase().includes(query.toLowerCase()) ||
                    (result.username && result.username.toLowerCase().includes(query.toLowerCase())),
                )
                .map((result, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer">
                    {result.type === "user" ? (
                      <>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={result.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {result.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{result.name}</p>
                          <p className="text-xs text-muted-foreground">{result.username}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-bold">#</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{result.name}</p>
                          <p className="text-xs text-muted-foreground">{result.posts}</p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
