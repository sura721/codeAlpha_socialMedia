'use client';

import { useState } from "react";
import Link from 'next/link';
import { formatDistanceToNowStrict } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BottomNavigation } from "@/components/bottom-navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { Search } from "lucide-react";
import { NotificationType } from '@/lib/generated';

type Notification = {
  id: string;
  type: NotificationType;
  creator: { name: string | null; username: string; avatar: string | null };
  post: { id: string; content: string | null } | null;
  comment: { content: string | null } | null;
  createdAt: Date;
};

type FormattedNotification = Notification & { action: string; timestamp: string; section: 'new' | 'earlier' };

function getNotificationLink(notification: Notification): string {
    if (notification.post?.id) {
        return `/post/${notification.post.id}`;
    }
    if (notification.type === 'FOLLOW') {
        return `/profile/${notification.creator.username}`;
    }
    return '#';
}

function getNotificationAction(type: NotificationType): string {
    switch (type) {
        case 'LIKE': return 'liked your post';
        case 'COMMENT': return 'commented on your post';
        case 'FOLLOW': return 'started following you';
        default: return 'notified you';
    }
}

function truncateText(text: string | null | undefined, length: number): string {
    if (!text) {
      return "";
    }
    if (text.length <= length) {
      return text;
    }
    return text.substring(0, length) + '...';
}

function NotificationItem({ notification }: { notification: FormattedNotification }) {
  return (
    <Link href={getNotificationLink(notification)}>
      <Card className="border-none shadow-none hover:bg-muted/50 transition-colors cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={notification.creator.avatar || undefined} />
              <AvatarFallback>{notification.creator.name?.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-semibold">{notification.creator.name}</span>{" "}
                <span className="text-muted-foreground">{notification.action}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
              
              {notification.type === 'COMMENT' && notification.comment?.content && (
                <p className="text-sm text-muted-foreground mt-2">
                  {truncateText(notification.comment.content, 90)}
                </p>
              )}

              {notification.type === 'LIKE' && notification.post?.content && (
                <p className="text-sm text-muted-foreground mt-2">
                  {truncateText(notification.post.content, 90)}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function NotificationsClientPage({ notifications }: { notifications: Notification[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const formattedNotifications: FormattedNotification[] = notifications.map(n => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return {
      ...n,
      action: getNotificationAction(n.type),
      timestamp: formatDistanceToNowStrict(new Date(n.createdAt)),
      section: new Date(n.createdAt) > threeDaysAgo ? 'new' : 'earlier',
    };
  });

  const newNotifications = formattedNotifications.filter((n) => n.section === "new");
  const earlierNotifications = formattedNotifications.filter((n) => n.section === "earlier");
  const filteredNotifications = formattedNotifications.filter(
    (notification) =>
      notification.creator.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.action.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const isSearching = searchQuery.length > 0;

  return (
    <>
      <AppSidebar />
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
                onChange={(e) => setSearchQuery(e.target.value)}
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
              ) : <p className="text-muted-foreground">No notifications found for "{searchQuery}"</p>}
            </div>
          ) : (
            <div className="space-y-8">
              {newNotifications.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">New</h2>
                  <div className="space-y-2">
                    {newNotifications.map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                  </div>
                </div>
              )}
              {earlierNotifications.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Earlier</h2>
                  <div className="space-y-2">
                    {earlierNotifications.map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="lg:hidden min-h-screen bg-background pb-20">
        <div className="sticky top-0 z-40 bg-background border-b border-border">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                className="pl-10 bg-muted border-none rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              ) : <p className="text-muted-foreground text-sm">No results found</p>}
            </div>
          ) : (
            <>
              {newNotifications.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">New</h2>
                  <div className="space-y-2">
                    {newNotifications.map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                  </div>
                </div>
              )}
              {earlierNotifications.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Earlier</h2>
                  <div className="space-y-2">
                    {earlierNotifications.map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <BottomNavigation />
      </div>
    </>
  );
}