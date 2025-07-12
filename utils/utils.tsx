import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import React from "react";
import DOMPurify from 'isomorphic-dompurify'; 

type RenderHashtagsOptions = {
  isClickable?: boolean;
};

export function renderPostContent(htmlContent: string | null) {
  if (!htmlContent) return { __html: '' };

   const sanitized = DOMPurify.sanitize(htmlContent);
 
  const withHashtags = sanitized.replace(/(?<!\S)(#\w+)/g, (match) => {
    const tagName = match.trim().substring(1);
    return `<a href="/tags/${tagName}" class="text-blue-500 hover:underline">${match}</a>`;
  });

  return { __html: withHashtags };
}