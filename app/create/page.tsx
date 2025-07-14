 
import { auth } from "@clerk/nextjs/server";
import { WelcomeToCreate } from "./welcome-create";
import { CreatePostForm } from "@/components/CreatePostForm";
import { CreatePostAnimation } from "@/components/CreatePostAnimation";
import { PenSquare } from "lucide-react";
import { BottomNavigation } from "@/components/bottom-navigation";

export default async function CreatePostPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <WelcomeToCreate />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 lg:p-8">
      <div className="flex items-center justify-center gap-3 mb-6 lg:mb-8">
        <PenSquare className="h-8 w-8 text-purple-500" />
        <h1 className="text-3xl lg:text-4xl font-bold text-gradient text-center">
          Share Your Story
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div className="flex flex-col items-center justify-center p-6 bg-purple-50/50 dark:bg-gray-900/50 rounded-3xl">
          <div className="w-full max-w-xs lg:max-w-sm">
            <CreatePostAnimation />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-center mt-2">
            Let your creativity flow.
          </h2>
          <p className="text-muted-foreground text-center mt-2 max-w-sm">
            Craft a post that connects. Add relevant #hashtags to reach a wider
            audience.
          </p>
        </div>

        <div className="w-full">
          <CreatePostForm />
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
