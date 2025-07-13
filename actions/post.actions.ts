"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export async function createPost(content: string, imageUrl?: string) {
  const { userId: clerkId } =await auth();
  if (!clerkId) throw new Error("User not authenticated");

  if (!content || !content.trim()) {
    throw new Error("Post content cannot be empty");
  }

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found in database");

  const hashtagRegex = /#(\w+)/g;
  const matchedHashtags = content.match(hashtagRegex) || [];
  const uniqueHashtags = [...new Set(matchedHashtags.map(tag => tag.substring(1).toLowerCase()))];

  const hashtagConnectOrCreate = uniqueHashtags.map(name => ({
    where: { name },
    create: { name },
  }));

  await prisma.post.create({
    data: {
      authorId: user.id,
      content: content,
      image: imageUrl,
      hashtags: {
        connectOrCreate: hashtagConnectOrCreate,
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/explore");
}

export async function deletePost(postId: string) {
  const { userId: clerkId } =await auth();
  if (!clerkId) throw new Error("User not authenticated");

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) throw new Error("Post not found");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user || post.authorId !== user.id) throw new Error("Unauthorized");

  await prisma.post.delete({ where: { id: postId } });

  revalidatePath("/");
  revalidatePath("/explore");
}

export async function toggleLike(postId: string) {
  const { userId: clerkId } =await auth();
  if (!clerkId) throw new Error("User not authenticated");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found");

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { authorId: true }
  });
  if (!post) throw new Error("Post not found");

  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: {
        userId: user.id,
        postId: postId,
      },
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: { userId_postId: { userId: user.id, postId: postId } },
    });
  } else {
    await prisma.like.create({ data: { userId: user.id, postId: postId } });

    if (post.authorId !== user.id) {
      await prisma.notification.create({
        data: {
          type: 'LIKE',
          userId: post.authorId,
          creatorId: user.id,
          postId: postId,
        }
      });
    }
  }

  revalidatePath("/");
  revalidatePath(`/post/${postId}`);
  revalidatePath('/notifications');
}

export async function createComment(postId: string, content: string) {
  const { userId: clerkId } =await auth();
  if (!clerkId) throw new Error("User not authenticated");

  if (!content || !content.trim()) throw new Error("Comment cannot be empty");

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) throw new Error("User not found");
  
  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { authorId: true }
  });
  if (!post) throw new Error("Post not found");

  const newComment = await prisma.comment.create({
    data: {
      authorId: user.id,
      postId: postId,
      content: content,
    },
  });

  if (post.authorId !== user.id) {
    await prisma.notification.create({
      data: {
        type: 'COMMENT',
        userId: post.authorId,
        creatorId: user.id,
        postId: postId,
        commentId: newComment.id,
      }
    });
  }

  revalidatePath(`/`);
  revalidatePath(`/post/${postId}`);
  revalidatePath('/notifications');
}