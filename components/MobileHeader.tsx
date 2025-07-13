"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export function MobileHeader() {
  return (
    <div className="lg:hidden sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between p-3 h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image src="/logo.png" alt="PingNet Logo" fill className="object-contain" />
          </div>
          <span className="text-xl font-bold text-gradient">pingNet</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <Button>Sign In</Button>
            </Link>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}