import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import type { User } from "@/lib/generated";
import { FollowButton } from "./FollowButton";

interface UserHoverCardProps {
  children: React.ReactNode;
  user: User;
  isFollowing: boolean;
  isOwn: boolean; // Add this prop
}

export function UserHoverCard({ children, user, isFollowing, isOwn }: UserHoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={user.avatar || undefined} />
            <AvatarFallback>{user.name?.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-1">
            <h4 className="text-sm font-semibold">{user.name}</h4>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
            <p className="text-sm pt-2">{user.bio}</p>
          </div>
          {/* This is the fix: Only show the button if it's NOT your own card */}
          {!isOwn && (
            <div>
              <FollowButton userIdToFollow={user.id} isFollowing={isFollowing} />
            </div>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}