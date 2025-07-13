"use client";

import { Home, Search, Plus, Bell, User, Sparkles } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Image from "next/image";

const navigationItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Search, label: "Explore", href: "/explore" },
  { icon: Plus, label: "Create", href: "/create" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: User, label: "Profile", href: "/profile" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* --- Desktop Sidebar (Unchanged) --- */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-72 lg:bg-card/80 lg:backdrop-blur-xl lg:border-r lg:border-border/50">
        <div className="flex flex-col h-full p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="relative">
              <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 overflow-hidden" >
                <Image src="/logo.png" alt="PingNet Logo" fill className="object-contain p-0" />
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
          <div className="mt-auto pt-6 border-t border-border/50 space-y-6">
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonBox: "flex items-center w-full",
                    userButtonTrigger: "w-full flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-muted/50",
                    userButtonText: "text-base font-semibold text-left",
                    avatarBox: "h-9 w-9"
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="group flex items-center gap-4 px-6 py-4 rounded-2xl transition-colors hover-lift hover:bg-muted/50 text-muted-foreground hover:text-foreground">
                <User className="h-5 w-5" />
                <span className="font-semibold">Sign In</span>
              </Link>
            </SignedOut>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

    </>
  );
}