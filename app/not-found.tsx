"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search, ArrowLeft, Sparkles, Hash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl glass-morphism border-border/50 overflow-hidden">
        <CardContent className="p-12 text-center">
         
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 shadow-glow">
                <Image src={'/logo.png'} alt=""  fill 
    className="object-cover rounded-2xl"/>
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-3xl font-bold text-gradient">pingNet</span>
              <p className="text-sm text-muted-foreground font-medium">Connect & Share</p>
            </div>
          </div>

          {/* 404 Animation */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-gradient mb-4 animate-pulse">404</div>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full mx-auto mb-6"></div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gradient mb-4">Oops! Page Not Found</h1>
            <p className="text-lg text-muted-foreground mb-2">
              The page you're looking for seems to have wandered off into the digital void.
            </p>
            <p className="text-muted-foreground">Don't worry, even the best explorers sometimes take a wrong turn!</p>
          </div>

          {/* Floating Elements */}
          <div className="relative mb-8">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-200 dark:bg-purple-800 rounded-full animate-bounce"></div>
            <div className="absolute -top-2 -right-6 w-6 h-6 bg-pink-200 dark:bg-pink-800 rounded-full animate-bounce delay-100"></div>
            <div className="absolute -bottom-2 left-8 w-4 h-4 bg-orange-200 dark:bg-orange-800 rounded-full animate-bounce delay-200"></div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="rounded-2xl px-8 py-3 border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-950/20"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </Button>
            <Link href="/">
              <Button className="rounded-2xl px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 shadow-glow">
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link href="/explore">
              <Button
                variant="outline"
                className="rounded-2xl px-8 py-3 border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-950/20 bg-transparent"
              >
                <Search className="h-5 w-5 mr-2" />
                Explore
              </Button>
            </Link>
          </div>

          {/* Fun Fact */}
          <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-2xl border border-purple-200/50 dark:border-purple-800/50">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-purple-600 dark:text-purple-400">Fun Fact:</span> The first 404 error
              was discovered at CERN in 1992. You're now part of internet history! 🚀
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
