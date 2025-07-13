 
'use client';

import { useState, useTransition } from "react";
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Settings, Code, Plane, UtensilsCrossed, Palette, Music, Dumbbell, LucideIcon } from "lucide-react";
import { BottomNavigation } from "@/components/bottom-navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { FollowButton } from "@/components/FollowButton";
import { searchAction } from "@/actions/explore.actions";

type SuggestedUser = { id: string; name: string | null; username: string; bio: string | null; avatar: string | null; };
type TrendingTag = { id: string; name: string; _count: { posts: number }; };
type SearchResultUser = { id: string; name: string | null; username: string; avatar: string | null; };
type SearchResultTag = { id: string; name: string; _count: { posts: number; }; };

const tagStyles: { [key: string]: { icon: LucideIcon; color: string; } } = {
  'coding': { icon: Code, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' },
  'travel': { icon: Plane, color: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' },
  'food': { icon: UtensilsCrossed, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300' },
  'art': { icon: Palette, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300' },
  'music': { icon: Music, color: 'bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300' },
  'fitness': { icon: Dumbbell, color: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300' },
  'default': { icon: Code, color: 'bg-gray-100 text-gray-600 dark:bg-gray-900 dark:text-gray-300' },
};
const getTagStyle = (tagName: string) => tagStyles[tagName.toLowerCase()] || tagStyles.default;

export function ExploreClientPage({ initialTags, initialUsers }: { initialTags: TrendingTag[], initialUsers: SuggestedUser[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<{ users: SearchResultUser[], tags: SearchResultTag[] }>({ users: [], tags: [] });
  const [isSearchPending, startSearchTransition] = useTransition();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value.length > 0) {
      setIsSearching(true);
      startSearchTransition(async () => {
        const results = await searchAction(value);
        setSearchResults(results);
      });
    } else {
      setIsSearching(false);
      setSearchResults({ users: [], tags: [] });
    }
  };

  const allFilteredResults = [
    ...searchResults.users.map(u => ({ type: 'user' as const, ...u })),
    ...searchResults.tags.map(t => ({ type: 'hashtag' as const, ...t, posts: t._count.posts }))
  ];

  return (
    <>
      <AppSidebar />
      <div className="hidden lg:block min-h-screen bg-background lg:pl-72">
        <div className="max-w-4xl mx-auto p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Explore</h1>
            <button className="p-2" aria-label="Settings"><Settings className="h-5 w-5" /></button>
          </div>
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for posts or tags"
                className="pl-10 bg-muted border-none rounded-full h-12"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          {isSearching ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Search Results</h2>
              {isSearchPending ? <p className="text-muted-foreground">Searching...</p> : allFilteredResults.length > 0 ? (
                <div className="space-y-3">
                  {allFilteredResults.map((result) => (
                    <Link key={`${result.type}-${result.id}`} href={result.type === 'user' ? `/profile/${result.username}` : `/tags/${result.name}`} passHref>
                      <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            {result.type === "user" ? (
                              <>
                                <Avatar className="h-10 w-10"><AvatarImage src={result.avatar || undefined} /><AvatarFallback>{result.name?.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar>
                                <div><p className="font-medium">{result.name}</p><p className="text-sm text-muted-foreground">@{result.username}</p></div>
                              </>
                            ) : (
                              <>
                                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center"><span className="text-primary font-bold">#</span></div>
                                <div><p className="font-medium">#{result.name}</p><p className="text-sm text-muted-foreground">{result.posts} posts</p></div>
                              </>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : <p className="text-muted-foreground">No results found for "{searchQuery}"</p>}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-6">Explore Tags</h2>
                <div className="grid grid-cols-2 gap-4">
                  {initialTags.map((tag) => {
                    const style = getTagStyle(tag.name);
                    return (
                        <Link key={tag.id} href={`/tags/${tag.name}`} passHref>
                            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                                <CardContent className="p-6">
                                <div className={`w-12 h-12 rounded-xl ${style.color} flex items-center justify-center mb-4`}><style.icon className="h-6 w-6" /></div>
                                <h3 className="font-semibold text-lg mb-1">#{tag.name}</h3><p className="text-muted-foreground text-sm">{tag._count.posts} posts</p>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                  })}
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-6">Who to follow</h2>
                <div className="space-y-4">
                  {initialUsers.map((user) => (
                    <Card key={user.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12"><AvatarImage src={user.avatar || undefined} /><AvatarFallback>{user.name?.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar>
                            <div><p className="font-semibold">{user.name}</p><p className="text-muted-foreground text-sm">{user.bio}</p><p className="text-muted-foreground text-sm">@{user.username}</p></div>
                          </div>
                          <FollowButton userIdToFollow={user.id} isFollowing={false} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="lg:hidden min-h-screen bg-background pb-20">
        <div className="sticky top-0 z-40 bg-background border-b border-border"><div className="p-4"><div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search for posts or tags" className="pl-10 bg-muted border-none rounded-full" value={searchQuery} onChange={(e) => handleSearch(e.target.value)} /></div></div></div>
        <div className="p-4">
          {isSearching ? (
             <div className="space-y-4">
              <h2 className="text-lg font-semibold">Search Results</h2>
               {isSearchPending ? <p className="text-muted-foreground text-sm">Searching...</p> : allFilteredResults.length > 0 ? (
                 <div className="space-y-3">
                   {allFilteredResults.map((result) => (
                     <Link key={`${result.type}-${result.id}`} href={result.type === 'user' ? `/profile/${result.username}` : `/tags/${result.name}`} passHref>
                        <Card>
                          <CardContent className="p-3">
                            <div className="flex items-center gap-3">
                              {result.type === "user" ? (
                                <>
                                  <Avatar className="h-8 w-8"><AvatarImage src={result.avatar || undefined} /><AvatarFallback>{result.name?.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar>
                                  <div><p className="font-medium text-sm">{result.name}</p><p className="text-xs text-muted-foreground">@{result.username}</p></div>
                                </>
                              ) : (
                                <>
                                  <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center"><span className="text-primary font-bold text-sm">#</span></div>
                                  <div><p className="font-medium text-sm">#{result.name}</p><p className="text-xs text-muted-foreground">{result.posts} posts</p></div>
                                </>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                     </Link>
                   ))}
                 </div>
               ) : <p className="text-muted-foreground text-sm">No results found</p>}
             </div>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-4">Explore Tags</h2>
              <div className="grid grid-cols-2 gap-3 mb-8">
                  {initialTags.map((tag) => {
                     const style = getTagStyle(tag.name);
                    return (
                        <Link key={tag.id} href={`/tags/${tag.name}`} passHref>
                            <Card className="hover:shadow-sm transition-shadow cursor-pointer">
                                <CardContent className="p-4">
                                <div className={`w-10 h-10 rounded-lg ${style.color} flex items-center justify-center mb-3`}><style.icon className="h-5 w-5" /></div>
                                <h3 className="font-semibold mb-1">#{tag.name}</h3><p className="text-muted-foreground text-xs">{tag._count.posts} posts</p>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                  })}
              </div>
              <h2 className="text-lg font-semibold mb-4">Who to follow</h2>
              <div className="space-y-3">
                {initialUsers.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10"><AvatarImage src={user.avatar || undefined} /><AvatarFallback>{user.name?.split(" ").map((n) => n[0]).join("")}</AvatarFallback></Avatar>
                          <div><p className="font-medium text-sm">{user.name}</p><p className="text-muted-foreground text-xs">{user.bio}</p><p className="text-muted-foreground text-xs">@{user.username}</p></div>
                        </div>
                        <FollowButton userIdToFollow={user.id} isFollowing={false} />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
        <BottomNavigation />
      </div>
    </>
  );
}