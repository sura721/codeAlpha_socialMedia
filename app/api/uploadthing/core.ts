import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth();
  if (!userId) throw new UploadThingError("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  profilePicture: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        const imageUrl = file.ufsUrl;

        const updateClerkPromise = (async () => {
          const response = await fetch(imageUrl);
          const imageBlob = await  response.blob();
          const clerk = await clerkClient();
          await clerk.users.updateUserProfileImage(metadata.userId, {
            file: imageBlob,
          });
        })();

        const updateDbPromise = prisma.user.update({
          where: {
            clerkId: metadata.userId,
          },
          data: {
            avatar: imageUrl,
          },
        });

        await Promise.all([updateClerkPromise, updateDbPromise]);

        revalidatePath("/profile");

        return { uploadedBy: metadata.userId };
      } catch (error) {
         throw new UploadThingError("Failed to sync profile picture.");
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;