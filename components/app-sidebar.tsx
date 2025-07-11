"use client"

import { useState } from "react"
import { Hash, Home, Search, Bell, User, Plus, Sparkles } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigationItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Search, label: "Explore", href: "/explore" },
  { icon: Plus, label: "Create", href: "/create" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: User, label: "Profile", href: "/profile" },
]

export function AppSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-72 lg:bg-card/80 lg:backdrop-blur-xl lg:border-r lg:border-border/50">
        <div className="flex flex-col h-full p-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
                <Hash className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="h-4 w-4 text-yellow-400" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold text-gradient">pingNet</span>
              <p className="text-xs text-muted-foreground font-medium">Connect & Share</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-3 flex-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center gap-4 px-6 py-4 rounded-2xl transition-colors hover-lift",
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                    : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-semibold">{item.label}</span>
                {pathname === item.href && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                )}
              </Link>
            ))}
          </nav>

          {/* Theme toggle */}
          <div className="mt-auto pt-6 border-t border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header with Theme Toggle - Reduced height */}
      <div className="lg:hidden sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
                <Hash className="h-4.5 w-4.5 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5">
                <Sparkles className="h-2.5 w-2.5 text-yellow-400" />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold text-gradient">pingNet</span>
              <p className="text-xs text-muted-foreground font-medium">Connect & Share</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </>
  )
}
