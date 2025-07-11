"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNavigation } from "@/components/bottom-navigation"
import { MobileHeader } from "@/components/mobile-header"
import { AppSidebar } from "@/components/app-sidebar"

const followers = [
  {
    name: "Sarah Chen",
    username: "@sarahc",
    bio: "Frontend Developer",
    avatar: "/placeholder.svg?height=40&width=40",
    following: false,
  },
  {
    name: "Alex Rivera",
    username: "@alexr",
    bio: "UI/UX Designer",
    avatar: "/placeholder.svg?height=40&width=40",
    following: true,
  },
  {
    name: "Maya Patel",
    username: "@mayap",
    bio: "Product Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    following: false,
  },
  {
    name: "David Kim",
    username: "@davidk",
    bio: "Software Engineer",
    avatar: "/placeholder.svg?height=40&width=40",
    following: true,
  },
  {
    name: "Emma Wilson",
    username: "@emmaw",
    bio: "Data Scientist",
    avatar: "/placeholder.svg?height=40&width=40",
    following: false,
  },
  {
    name: "James Brown",
    username: "@jamesb",
    bio: "DevOps Engineer",
    avatar: "/placeholder.svg?height=40&width=40",
    following: true,
  },
]

function FollowerCard({ follower }: { follower: (typeof followers)[0] }) {
  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={follower.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {follower.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{follower.name}</p>
              <p className="text-sm text-muted-foreground">{follower.username}</p>
              <p className="text-xs text-muted-foreground">{follower.bio}</p>
            </div>
          </div>
          <Button variant={follower.following ? "outline" : "default"} size="sm" className="rounded-full">
            {follower.following ? "Following" : "Follow"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function FollowersPage() {
  return (
    <>
      <AppSidebar />

      {/* Desktop Layout */}
      <div className="hidden lg:block min-h-screen bg-background lg:pl-64">
        <div className="max-w-2xl mx-auto p-8">
          <h1 className="text-2xl font-bold mb-6">Followers</h1>
          <div className="space-y-4">
            {followers.map((follower, index) => (
              <FollowerCard key={index} follower={follower} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen bg-background pb-20">
        <MobileHeader title="Followers" showBack />
        <div className="p-4">
          <div className="space-y-3">
            {followers.map((follower, index) => (
              <FollowerCard key={index} follower={follower} />
            ))}
          </div>
        </div>
        <BottomNavigation />
      </div>
    </>
  )
}
