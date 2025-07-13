import { auth } from '@clerk/nextjs/server';

import { WelcomeToCreate } from './welcome-create';
import { CreatePostForm } from '@/components/CreatePostForm';

export default async function CreatePostPage() {
  const { userId } =await auth();

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {userId ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold">Create Post</h1>
          </div>
          <CreatePostForm />
        </>
      ) : (
        <WelcomeToCreate />
      )}
    </div>
  );
}