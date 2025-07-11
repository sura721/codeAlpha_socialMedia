"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BottomNavigation } from "@/components/bottom-navigation"
import { MobileHeader } from "@/components/mobile-header"
import { AppSidebar } from "@/components/app-sidebar"

const following = [
  {
    name: "Tech Insider",
    username: "@techinsider",
    bio: "Latest tech news and insights",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Design Weekly",
    username: "@designweekly",
    bio: "Weekly design inspiration",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Code Academy",
    username: "@codeacademy",
    bio: "Learn to code with us",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Startup Life",
    username: "@startuplife",
    bio: "Entrepreneurship and startups",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "AI Research",
    username: "@airesearch",
    bio: "Latest in AI and ML",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

function FollowingCard({ user }: { user: (typeof following)[0] }) {
  return (
    <Card className="mb-3">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
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
              <p className="text-sm text-muted-foreground">{user.username}</p>
              <p className="text-xs text-muted-foreground">{user.bio}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="rounded-full bg-transparent">
            Following
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function FollowingPage() {
  return (
    <>
      <AppSidebar />

      {/* Desktop Layout */}
      <div className="hidden lg:block min-h-screen bg-background lg:pl-64">
        <div className="max-w-2xl mx-auto p-8">
          <h1 className="text-2xl font-bold mb-6">Following</h1>
          <div className="space-y-4">
            {following.map((user, index) => (
              <FollowingCard key={index} user={user} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen bg-background pb-20">
        <MobileHeader title="Following" showBack />
        <div className="p-4">
          <div className="space-y-3">
            {following.map((user, index) => (
              <FollowingCard key={index} user={user} />
            ))}
          </div>
        </div>
        <BottomNavigation />
      </div>
    </>
  )
}
