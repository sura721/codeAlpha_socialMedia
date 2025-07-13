import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CommunityAnimation } from '@/components/ui/lottie-animation';

export function WelcomeToCreate() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 lg:py-24">
      <div className="w-64 h-64 lg:w-80 lg:h-80">
        <CommunityAnimation />
      </div>

      <h2 className="text-3xl lg:text-4xl font-bold mt-4">
        Join the Conversation
      </h2>
      <p className="max-w-md mt-3 text-base lg:text-lg text-muted-foreground">
        Share your thoughts, connect with others, and discover new ideas. Create an account to start posting.
      </p>

      <div className="flex items-center gap-4 mt-8">
        <Link href="/sign-up">
          <Button size="lg" className="rounded-full">
            Sign Up
          </Button>
        </Link>
        <Link href="/sign-in">
          <Button size="lg" variant="outline" className="rounded-full">
            Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
}