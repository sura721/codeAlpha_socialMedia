import { auth } from '@clerk/nextjs/server';
import prisma from './prisma'
import { NotificationType } from './generated';

export async function getTrendingTags(limit: number = 6) {
  return prisma.hashtag.findMany({
    take: limit,
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: {
      posts: {
        _count: 'desc',
      },
    },
  });
}

export async function getNotifications() {
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    return [];
  }
  
  const currentUser = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true }
  });

  if (!currentUser) {
    return [];
  }

  const notifications = await prisma.notification.findMany({
    where: {
      userId: currentUser.id,
    },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true,
        },
      },
      post: {
        select: {
          id: true,
          content: true,
        }
      },
      comment: {
        select: {
            content: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return notifications.filter(n => n.creatorId !== currentUser.id);
}


export async function getSuggestedUsers(currentUserId: string, limit: number = 3) {
  return prisma.user.findMany({
    take: limit,
    where: {
      AND: [
        { id: { not: currentUserId } },
        { followers: { none: { followerId: currentUserId } } },
      ],
    },
  });
}

export async function searchUsersAndTags(query: string, limit: number = 5) {
  if (!query) return { users: [], tags: [] };
  
  const [users, tags] = await Promise.all([
    prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query, mode: 'insensitive' } },
          { name: { contains: query, mode: 'insensitive' } },
        ],
      },
      take: limit,
    }),
    prisma.hashtag.findMany({
      where: {
        name: { contains: query, mode: 'insensitive' },
      },
      take: limit,
      include: {
        _count: {
          select: { posts: true },
        },
      },
    }),
  ]);
  return { users, tags };
}

export async function getPostsForHashtagPage(tagName: string) {
  const { userId: clerkId } =await auth();

  const postsData = await prisma.post.findMany({
    where: {
      hashtags: {
        some: {
          name: decodeURIComponent(tagName),
        },
      },
    },
    include: {
      author: true,
      _count: {
        select: { likes: true, comments: true },
      },
      likes: {
        where: {
          user: {
            clerkId: clerkId ?? undefined,
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!clerkId) {
    return postsData.map(post => ({
      ...post,
      isOwn: false,
      isLiked: false,
      isFollowingAuthor: false,
    }));
  }

  const currentUser = await prisma.user.findUnique({
    where: { clerkId },
    select: {
      following: {
        select: {
          followingId: true,
        },
      },
    },
  });

  if (!currentUser) {
    return postsData.map(post => ({
      ...post,
      isOwn: false,
      isLiked: false,
      isFollowingAuthor: false,
    }));
  }

  const followingIds = new Set(currentUser.following.map(f => f.followingId));

  return postsData.map(post => ({
    ...post,
    isOwn: post.author.clerkId === clerkId,
    isLiked: post.likes.length > 0,
    isFollowingAuthor: followingIds.has(post.authorId),
  }));
}