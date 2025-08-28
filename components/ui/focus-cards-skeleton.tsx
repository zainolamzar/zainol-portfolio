"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function FocusCardsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl relative bg-gray-100 dark:bg-neutral-900 overflow-hidden w-full shadow-md"
        >
          {/* Match Card's 16:9 ratio */}
          <div className="relative w-full aspect-video">
            <Skeleton className="h-full w-full" />
          </div>

          {/* Overlay placeholders (same as card hover overlay) */}
          <div className="absolute inset-0 flex flex-col justify-end py-6 px-4">
            <Skeleton className="h-6 w-3/4 mb-2" /> {/* Title */}
            <Skeleton className="h-4 w-2/3 mb-2" /> {/* Description */}
            <Skeleton className="h-3 w-1/2" /> {/* Date */}
          </div>
        </div>
      ))}
    </div>
  );
}