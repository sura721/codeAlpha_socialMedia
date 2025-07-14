 
"use client";

import Lottie from "lottie-react";
import animationData from '@/public/createpost.json';

 export function CreatePostAnimation() {
  return (
    <div className="p-4">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}