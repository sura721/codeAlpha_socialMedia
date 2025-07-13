"use client";

import { useState, useTransition, useEffect } from "react";
import { Button } from "./ui/button";
import { toggleFollow } from "@/actions/user.actions";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface FollowButtonProps {
  userIdToFollow: string;
  isFollowing: boolean;
  className?: string;
}

export function FollowButton({ userIdToFollow, isFollowing, className }: FollowButtonProps) {
  const [isPending, startTransition] = useTransition();
  const { isSignedIn } = useUser();
  const router = useRouter();

  const [optimisticIsFollowing, setOptimisticIsFollowing] = useState(isFollowing);

  useEffect(() => {
    setOptimisticIsFollowing(isFollowing);
  }, [isFollowing]);

  const handleFollow = () => {
    if (!isSignedIn) {
      return router.push('/sign-in');
    }

    startTransition(() => {
      setOptimisticIsFollowing((prev) => !prev);
      toggleFollow(userIdToFollow).catch(() => {
        setOptimisticIsFollowing(isFollowing);
        toast.error("Something went wrong. Please try again.");
      });
    });
  };

  return (
    <Button
      onClick={handleFollow}
      disabled={isPending}
      variant={optimisticIsFollowing ? "outline" : "default"}
      className={cn("rounded-full", className)}
    >
      {isPending ? "..." : optimisticIsFollowing ? "Following" : "Follow"}
    </Button>
  );
}