export interface User {
  id: string
  email: string
  username: string
  clerkId: string
  name?: string
  bio?: string
  image?: string
  location?: string
  website?: string
  createdAt: string
  updatedAt: string
}

export interface Post {
  id: string
  authorId: string
  content?: string
  images?: string[]
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: string
  content: string
  authorId: string
  postId: string
  createdAt: string
}

export interface Like {
  id: string
  postId: string
  userId: string
  createdAt: string
}

export interface Follow {
  followerId: string
  followingId: string
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  creatorId: string
  type: "LIKE" | "COMMENT" | "FOLLOW"
  read: boolean
  postId?: string
  commentId?: string
  createdAt: string
}

// Mock current user
export const CURRENT_USER_ID = "current-user-123"

// Initialize mock data
export const initializeMockData = () => {
  if (typeof window === "undefined") return

  // Initialize users
  if (!localStorage.getItem("users")) {
    const users: User[] = [
      {
        id: CURRENT_USER_ID,
        email: "you@example.com",
        username: "you",
        clerkId: "clerk-current-user",
        name: "Ethan Carter",
        bio: "Software Engineer | Photography Enthusiast",
        image: "/placeholder.svg?height=128&width=128",
        location: "San Francisco, CA",
        website: "https://ethancarter.dev",
        createdAt: "2021-01-01T00:00:00Z",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "user-1",
        email: "sarah@example.com",
        username: "sarahc",
        clerkId: "clerk-sarah",
        name: "Sarah Chen",
        bio: "Frontend Developer",
        image: "/placeholder.svg?height=40&width=40",
        location: "New York, NY",
        website: "https://sarahchen.dev",
        createdAt: "2021-03-15T00:00:00Z",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "user-2",
        email: "alex@example.com",
        username: "alexr",
        clerkId: "clerk-alex",
        name: "Alex Rivera",
        bio: "UI/UX Designer",
        image: "/placeholder.svg?height=40&width=40",
        location: "Los Angeles, CA",
        createdAt: "2021-05-20T00:00:00Z",
        updatedAt: new Date().toISOString(),
      },
      {
        id: "user-3",
        email: "maya@example.com",
        username: "mayap",
        clerkId: "clerk-maya",
        name: "Maya Patel",
        bio: "Product Manager",
        image: "/placeholder.svg?height=40&width=40",
        location: "Seattle, WA",
        createdAt: "2021-07-10T00:00:00Z",
        updatedAt: new Date().toISOString(),
      },
    ]
    localStorage.setItem("users", JSON.stringify(users))
  }

  // Initialize posts
  if (!localStorage.getItem("posts")) {
    const posts: Post[] = [
      {
        id: "post-1",
        authorId: "user-1",
        content:
          "Just launched my new project! Here are some screenshots of the journey. Excited to share it with everyone! 🚀",
        images: [
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
          "/placeholder.svg?height=300&width=400",
        ],
        createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      },
      {
        id: "post-2",
        authorId: "user-2",
        content: "Beautiful sunset today! Sometimes you just need to stop and appreciate the simple things in life.",
        images: ["/placeholder.svg?height=300&width=400"],
        createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      },
      {
        id: "post-3",
        authorId: CURRENT_USER_ID,
        content: "Working on some exciting new features for our app. The team has been incredible! 💻✨",
        images: ["/placeholder.svg?height=300&width=400", "/placeholder.svg?height=300&width=400"],
        createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      },
    ]
    localStorage.setItem("posts", JSON.stringify(posts))
  }

  // Initialize likes
  if (!localStorage.getItem("likes")) {
    const likes: Like[] = [
      { id: "like-1", postId: "post-1", userId: CURRENT_USER_ID, createdAt: new Date().toISOString() },
      { id: "like-2", postId: "post-1", userId: "user-2", createdAt: new Date().toISOString() },
      { id: "like-3", postId: "post-2", userId: CURRENT_USER_ID, createdAt: new Date().toISOString() },
    ]
    localStorage.setItem("likes", JSON.stringify(likes))
  }

  // Initialize follows
  if (!localStorage.getItem("follows")) {
    const follows: Follow[] = [
      { followerId: CURRENT_USER_ID, followingId: "user-1", createdAt: new Date().toISOString() },
      { followerId: CURRENT_USER_ID, followingId: "user-2", createdAt: new Date().toISOString() },
      { followerId: "user-1", followingId: CURRENT_USER_ID, createdAt: new Date().toISOString() },
      { followerId: "user-2", followingId: CURRENT_USER_ID, createdAt: new Date().toISOString() },
    ]
    localStorage.setItem("follows", JSON.stringify(follows))
  }

  // Initialize comments
  if (!localStorage.getItem("comments")) {
    const comments: Comment[] = [
      {
        id: "comment-1",
        content: "Wow, looks amazing! Where exactly was this project built?",
        authorId: "user-2",
        postId: "post-1",
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      },
      {
        id: "comment-2",
        content: "Thanks! It was built using React and Next.js. Really enjoying the development process!",
        authorId: "user-1",
        postId: "post-1",
        createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      },
    ]
    localStorage.setItem("comments", JSON.stringify(comments))
  }

  // Initialize notifications
  if (!localStorage.getItem("notifications")) {
    const notifications: Notification[] = [
      {
        id: "notif-1",
        userId: CURRENT_USER_ID,
        creatorId: "user-1",
        type: "LIKE",
        read: false,
        postId: "post-3",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "notif-2",
        userId: CURRENT_USER_ID,
        creatorId: "user-2",
        type: "COMMENT",
        read: false,
        postId: "post-3",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "notif-3",
        userId: CURRENT_USER_ID,
        creatorId: "user-3",
        type: "FOLLOW",
        read: false,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]
    localStorage.setItem("notifications", JSON.stringify(notifications))
  }
}
