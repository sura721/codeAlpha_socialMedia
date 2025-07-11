"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Settings, Code, Plane, UtensilsCrossed, Palette, Music, Dumbbell } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { AppSidebar } from "@/components/app-sidebar"

const exploreTags = [
  {
    name: "#coding",
    posts: "1,280 posts",
    icon: Code,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
  },
  {
    name: "#travel",
    posts: "2,500 posts",
    icon: Plane,
    color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
  },
  {
    name: "#food",
    posts: "3,100 posts",
    icon: UtensilsCrossed,
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300",
  },
  {
    name: "#art",
    posts: "850 posts",
    icon: Palette,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
  },
  {
    name: "#music",
    posts: "1,000 posts",
    icon: Music,
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300",
  },
  {
    name: "#fitness",
    posts: "1,500 posts",
    icon: Dumbbell,
    color: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
  },
]

const suggestedUsers = [
  { name: "Liam Carter", bio: "Software engineer", username: "@liamc", avatar: "/placeholder.svg?height=40&width=40" },
  {
    name: "Sophia Bennett",
    bio: "Product Designer",
    username: "@sophiab",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Ethan Davis",
    bio: "Tech, gaming, cooking",
    username: "@ethand",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const searchResults = [
  { type: "user", name: "Sarah Chen", username: "@sarahc", avatar: "/placeholder.svg?height=32&width=32" },
  { type: "user", name: "Alex Rivera", username: "@alexr", avatar: "/placeholder.svg?height=32&width=32" },
  { type: "hashtag", name: "#technology", posts: "12.5K posts" },
  { type: "hashtag", name: "#design", posts: "8.2K posts" },
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const filteredResults = searchResults.filter(
    (result) =>
      result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (result.username && result.username.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setIsSearching(value.length > 0)
  }

  return (
    <>
      <AppSidebar />

      {/* Desktop Layout */}
      <div className="hidden lg:block min-h-screen bg-background lg:pl-72">
        <div className="max-w-4xl mx-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Explore</h1>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for posts or tags"
                className="pl-10 bg-muted border-none rounded-full h-12"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>

          {isSearching ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Search Results</h2>
              {filteredResults.length > 0 ? (
                <div className="space-y-3">
                  {filteredResults.map((result, index) => (
                    <Card key={index} className="hover:shadow-sm transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          {result.type === "user" ? (
                            <>
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={result.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {result.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{result.name}</p>
                                <p className="text-sm text-muted-foreground">{result.username}</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-primary font-bold">#</span>
                              </div>
                              <div>
                                <p className="font-medium">{result.name}</p>
                                <p className="text-sm text-muted-foreground">{result.posts}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-6">Explore Tags</h2>
                <div className="grid grid-cols-2 gap-4">
                  {exploreTags.map((tag) => (
                    <Card key={tag.name} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className={`w-12 h-12 rounded-xl ${tag.color} flex items-center justify-center mb-4`}>
                          <tag.icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{tag.name}</h3>
                        <p className="text-muted-foreground text-sm">{tag.posts}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-6">Who to follow</h2>
                <div className="space-y-4">
                  {suggestedUsers.map((user, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{user.name}</p>
                              <p className="text-muted-foreground text-sm">{user.bio}</p>
                              <p className="text-muted-foreground text-sm">{user.username}</p>
                            </div>
                          </div>
                          <Button className="rounded-full">Follow</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen bg-background pb-20">
        <div className="sticky top-0 z-40 bg-background border-b border-border">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for posts or tags"
                className="pl-10 bg-muted border-none rounded-full"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="p-4">
          {isSearching ? (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Search Results</h2>
              {filteredResults.length > 0 ? (
                <div className="space-y-3">
                  {filteredResults.map((result, index) => (
                    <Card key={index}>
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
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
                                <p className="font-medium text-sm">{result.name}</p>
                                <p className="text-xs text-muted-foreground">{result.username}</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="text-primary font-bold text-sm">#</span>
                              </div>
                              <div>
                                <p className="font-medium text-sm">{result.name}</p>
                                <p className="text-xs text-muted-foreground">{result.posts}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No results found</p>
              )}
            </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-4">Explore Tags</h2>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {exploreTags.map((tag) => (
                  <Card key={tag.name} className="hover:shadow-sm transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className={`w-10 h-10 rounded-lg ${tag.color} flex items-center justify-center mb-3`}>
                        <tag.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold mb-1">{tag.name}</h3>
                      <p className="text-muted-foreground text-xs">{tag.posts}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h2 className="text-lg font-semibold mb-4">Who to follow</h2>
              <div className="space-y-3">
                {suggestedUsers.map((user, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-muted-foreground text-xs">{user.bio}</p>
                            <p className="text-muted-foreground text-xs">{user.username}</p>
                          </div>
                        </div>
                        <Button size="sm" className="rounded-full">
                          Follow
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>

        <BottomNavigation />
      </div>
    </>
  )
}
