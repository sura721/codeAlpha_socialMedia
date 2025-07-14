 
"use client";

import Lottie from "lottie-react";
import animationData from "@/public/noresult.json";

export function NoResultsFound({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="flex flex-col items-center text-center py-8">
      <div className="w-full max-w-[180px]">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <h3 className="mt-4 text-lg font-bold">No Results Found</h3>
      <p className="text-muted-foreground mt-1 text-sm">
        Your search for "{searchQuery}" did not return any results.
      </p>
    </div>
  );
}