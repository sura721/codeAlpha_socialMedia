import {
  type User,
  type Post,
  type Comment,
  type Like,
  type Follow,
  type Notification,
  CURRENT_USER_ID,
} from "./mock-data"

export class DataService {
  // User operations
  static getUsers(): User[] {
    const users = localStorage.getItem("users")
    return users ? JSON.parse(users) : []
  }

  static getUserById(id: string): User | null {
    const users = this.getUsers()
    return users.find((user) => user.id === id) || null
  }

  static getCurrentUser(): User | null {
    return this.getUserById(CURRENT_USER_ID)
  }

  static updateUser(id: string, updates: Partial<User>): User | null {
    const users = this.getUsers()
    const userIndex = users.findIndex((user) => user.id === id)
    if (userIndex === -1) return null

    users[userIndex] = { ...users[userIndex], ...updates, updatedAt: new Date().toISOString() }
    localStorage.setItem("users", JSON.stringify(users))
    return users[userIndex]
  }

  // Post operations
  static getPosts(): Post[] {
    const posts = localStorage.getItem("posts")
    return posts ? JSON.parse(posts) : []
  }

  static getPostById(id: string): Post | null {
    const posts = this.getPosts()
    return posts.find((post) => post.id === id) || null
  }

  static createPost(content: string, images?: string[]): Post {
    const posts = this.getPosts()
    const newPost: Post = {
      id: `post-${Date.now()}`,
      authorId: CURRENT_USER_ID,
      content,
      images,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    posts.unshift(newPost)
    localStorage.setItem("posts", JSON.stringify(posts))
    return newPost
  }

  static updatePost(id: string, updates: Partial<Post>): Post | null {
    const posts = this.getPosts()
    const postIndex = posts.findIndex((post) => post.id === id)
    if (postIndex === -1) return null

    posts[postIndex] = { ...posts[postIndex], ...updates, updatedAt: new Date().toISOString() }
    localStorage.setItem("posts", JSON.stringify(posts))
    return posts[postIndex]
  }

  static deletePost(id: string): boolean {
    const posts = this.getPosts()
    const filteredPosts = posts.filter((post) => post.id !== id)
    if (filteredPosts.length === posts.length) return false

    localStorage.setItem("posts", JSON.stringify(filteredPosts))
    return true
  }

  // Like operations
  static getLikes(): Like[] {
    const likes = localStorage.getItem("likes")
    return likes ? JSON.parse(likes) : []
  }

  static getPostLikes(postId: string): Like[] {
    const likes = this.getLikes()
    return likes.filter((like) => like.postId === postId)
  }

  static toggleLike(postId: string): boolean {
    const likes = this.getLikes()
    const existingLike = likes.find((like) => like.postId === postId && like.userId === CURRENT_USER_ID)

    if (existingLike) {
      const filteredLikes = likes.filter((like) => like.id !== existingLike.id)
      localStorage.setItem("likes", JSON.stringify(filteredLikes))
      return false
    } else {
      const newLike: Like = {
        id: `like-${Date.now()}`,
        postId,
        userId: CURRENT_USER_ID,
        createdAt: new Date().toISOString(),
      }
      likes.push(newLike)
      localStorage.setItem("likes", JSON.stringify(likes))
      return true
    }
  }

  static isPostLiked(postId: string): boolean {
    const likes = this.getLikes()
    return likes.some((like) => like.postId === postId && like.userId === CURRENT_USER_ID)
  }

  // Follow operations
  static getFollows(): Follow[] {
    const follows = localStorage.getItem("follows")
    return follows ? JSON.parse(follows) : []
  }

  static getFollowers(userId: string): User[] {
    const follows = this.getFollows()
    const users = this.getUsers()
    const followerIds = follows.filter((follow) => follow.followingId === userId).map((follow) => follow.followerId)
    return users.filter((user) => followerIds.includes(user.id))
  }

  static getFollowing(userId: string): User[] {
    const follows = this.getFollows()
    const users = this.getUsers()
    const followingIds = follows.filter((follow) => follow.followerId === userId).map((follow) => follow.followingId)
    return users.filter((user) => followingIds.includes(user.id))
  }

  static toggleFollow(userId: string): boolean {
    const follows = this.getFollows()
    const existingFollow = follows.find(
      (follow) => follow.followerId === CURRENT_USER_ID && follow.followingId === userId,
    )

    if (existingFollow) {
      const filteredFollows = follows.filter(
        (follow) => !(follow.followerId === CURRENT_USER_ID && follow.followingId === userId),
      )
      localStorage.setItem("follows", JSON.stringify(filteredFollows))
      return false
    } else {
      const newFollow: Follow = {
        followerId: CURRENT_USER_ID,
        followingId: userId,
        createdAt: new Date().toISOString(),
      }
      follows.push(newFollow)
      localStorage.setItem("follows", JSON.stringify(follows))
      return true
    }
  }

  static isFollowing(userId: string): boolean {
    const follows = this.getFollows()
    return follows.some((follow) => follow.followerId === CURRENT_USER_ID && follow.followingId === userId)
  }

  // Comment operations
  static getComments(): Comment[] {
    const comments = localStorage.getItem("comments")
    return comments ? JSON.parse(comments) : []
  }

  static getPostComments(postId: string): Comment[] {
    const comments = this.getComments()
    return comments.filter((comment) => comment.postId === postId)
  }

  static createComment(postId: string, content: string): Comment {
    const comments = this.getComments()
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      content,
      authorId: CURRENT_USER_ID,
      postId,
      createdAt: new Date().toISOString(),
    }
    comments.push(newComment)
    localStorage.setItem("comments", JSON.stringify(comments))
    return newComment
  }

  // Notification operations
  static getNotifications(): Notification[] {
    const notifications = localStorage.getItem("notifications")
    return notifications ? JSON.parse(notifications) : []
  }

  static getUserNotifications(userId: string): Notification[] {
    const notifications = this.getNotifications()
    return notifications
      .filter((notification) => notification.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  static markNotificationAsRead(id: string): boolean {
    const notifications = this.getNotifications()
    const notificationIndex = notifications.findIndex((notification) => notification.id === id)
    if (notificationIndex === -1) return false

    notifications[notificationIndex].read = true
    localStorage.setItem("notifications", JSON.stringify(notifications))
    return true
  }

  // Utility functions
  static getPostWithAuthor(postId: string) {
    const post = this.getPostById(postId)
    if (!post) return null

    const author = this.getUserById(post.authorId)
    const likes = this.getPostLikes(postId)
    const comments = this.getPostComments(postId)
    const isLiked = this.isPostLiked(postId)

    return {
      ...post,
      author,
      likes: likes.length,
      comments: comments.length,
      isLiked,
    }
  }

  static getPostsWithAuthors() {
    const posts = this.getPosts()
    const users = this.getUsers()
    const likes = this.getLikes()
    const comments = this.getComments()

    return posts
      .map((post) => {
        const author = users.find((user) => user.id === post.authorId)
        const postLikes = likes.filter((like) => like.postId === post.id)
        const postComments = comments.filter((comment) => comment.postId === post.id)
        const isLiked = likes.some((like) => like.postId === post.id && like.userId === CURRENT_USER_ID)

        return {
          ...post,
          author,
          likes: postLikes.length,
          comments: postComments.length,
          isLiked,
          isOwn: post.authorId === CURRENT_USER_ID,
        }
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  static formatTimeAgo(dateString: string): string {
    const now = new Date()
    const date = new Date(dateString)
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }
}
