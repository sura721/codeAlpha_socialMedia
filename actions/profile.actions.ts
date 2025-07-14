 
"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const UpdateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50),

   bio: z.string().max(160).optional().transform(val => val === '' ? null : val),
  location: z.string().max(30).optional().transform(val => val === '' ? null : val),
  
   website: z.string()
    .url("Please provide a valid URL if the field is not empty.")
    .or(z.literal(''))
    .optional()
    .transform(val => val === '' ? null : val),
});

 type UserProfileUpdateData = z.infer<typeof UpdateUserSchema>;

export async function updateUserProfile(formData: UserProfileUpdateData) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("You must be signed in to update your profile.");
  }
  
  const validatedData = UpdateUserSchema.parse(formData);

  try {
    await prisma.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        ...validatedData,
      },
    });

    revalidatePath("/profile");
    return { success: true, message: "Profile updated successfully." };
  } catch (error) {
    return { success: false, message: "Failed to update profile." };
  }
}

 
export async function updateUserAvatar(avatarUrl: string) {
  const { userId } =await auth();
  if (!userId) {
     throw new Error("You must be signed in to update your avatar.");
  }

  try {
    await prisma.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        avatar: avatarUrl,
      },
    });

     revalidatePath("/profile");

    return { success: true };
  } catch (error) {
    console.error("Failed to update avatar in local database:", error);
    return { success: false, message: "Could not sync new avatar." };
  }
}