"use client"

import { Home, Search, Bell, User, Plus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"


export function BottomNavigation() {
  const {user} = useUser()
  const pathname = usePathname()

const navigationItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Search, label: "Explore", href: "/explore" },
  { icon: Plus, label: "Create", href: "/create" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: User, label: "Profile",href: user ? `/profile/${user.username}` : "/not-found" },
]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-50">
      <div className="flex items-center justify-around py-1 px-3 max-w-md mx-auto">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors",
                isActive
                  ? "text-blue-600 bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "fill-current")} />
              <span className="text-xs mt-0.5 font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
