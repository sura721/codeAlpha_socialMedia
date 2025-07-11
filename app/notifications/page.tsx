"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Search } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"

const notifications = [
  {
    id: 1,
    type: "like",
    user: { name: "Sophia Carter", avatar: "/placeholder.svg?height=40&width=40" },
    action: "liked your post",
    timestamp: "2d",
    section: "new",
  },
  {
    id: 2,
    type: "comment",
    user: { name: "Ethan Walker", avatar: "/placeholder.svg?height=40&width=40" },
    action: "commented on your post",
    timestamp: "4d",
    section: "new",
  },
  {
    id: 3,
    type: "follow",
    user: { name: "Olivia Bennett", avatar: "/placeholder.svg?height=40&width=40" },
    action: "started following you",
    timestamp: "7d",
    section: "new",
  },
  {
    id: 4,
    type: "tag",
    user: { name: "Noah Thompson", avatar: "/placeholder.svg?height=40&width=40" },
    action: "tagged you in a post",
    timestamp: "10d",
    section: "new",
  },
  {
    id: 5,
    type: "like",
    user: { name: "Ava Harper", avatar: "/placeholder.svg?height=40&width=40" },
    action: "and 4 others liked your post",
    timestamp: "5d",
    section: "earlier",
  },
  {
    id: 6,
    type: "follow",
    user: { name: "Liam Parker", avatar: "/placeholder.svg?height=40&width=40" },
    action: "an account you follow, started following you",
    timestamp: "11d",
    section: "earlier",
  },
]

function NotificationItem({ notification }: { notification: (typeof notifications)[0] }) {
  return (
    <Card className="border-none shadow-none hover:bg-muted/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 lg:h-12 lg:w-12">
            <AvatarImage src={notification.user.avatar || "/placeholder.svg"} />
            <AvatarFallback>
              {notification.user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm lg:text-base">
              <span className="font-semibold">{notification.user.name}</span>{" "}
              <span className="text-muted-foreground">{notification.action}</span>
            </p>
            <p className="text-xs lg:text-sm text-muted-foreground mt-1">{notification.timestamp}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const newNotifications = notifications.filter((n) => n.section === "new")
  const earlierNotifications = notifications.filter((n) => n.section === "earlier")

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.action.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSearch = (value: string) => {
    setSearchQuery(value)
    setIsSearching(value.length > 0)
  }

  return (
    <>
      <AppSidebar />

      {/* Desktop Layout */}
      <div className="hidden lg:block min-h-screen bg-background lg:pl-64">
        <div className="max-w-2xl mx-auto p-8">
          <h1 className="text-2xl font-bold mb-6">Notifications</h1>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                className="pl-10 bg-muted border-none rounded-full"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>

          {isSearching ? (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Search Results</h2>
              {filteredNotifications.length > 0 ? (
                <div className="space-y-2">
                  {filteredNotifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No notifications found for "{searchQuery}"</p>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold mb-4">New</h2>
                <div className="space-y-2">
                  {newNotifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Earlier</h2>
                <div className="space-y-2">
                  {earlierNotifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
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
                placeholder="Search notifications..."
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
              {filteredNotifications.length > 0 ? (
                <div className="space-y-2">
                  {filteredNotifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No results found</p>
              )}
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">New</h2>
                <div className="space-y-2">
                  {newNotifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">Earlier</h2>
                <div className="space-y-2">
                  {earlierNotifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <BottomNavigation />
      </div>
    </>
  )
}
