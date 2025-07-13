'use client';

import Lottie from 'lottie-react';
import animationData from '@/public/community.json';

export function CommunityAnimation() {
    return <Lottie animationData={animationData} loop={true} />;
}