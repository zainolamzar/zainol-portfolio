"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

type CardData = {
  title: string;
  src: string;
  href: string; // slug-based link
  description?: string;
  tech_stack?: string[];
  date?: string; // for blogs
};

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: CardData;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <Link
      href={card.href}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg sm:rounded-xl relative bg-gray-100 dark:bg-neutral-900 overflow-hidden w-full transition-all duration-300 ease-out shadow-lg hover:shadow-2xl",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      {/* Image wrapper with 16:9 ratio */}
      <div className="relative w-full aspect-video">
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${card.src}`}
          alt={card.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Overlay on hover - Always visible on mobile for better UX */}
      <div
        className={cn(
          "absolute inset-0 bg-black/60 flex flex-col justify-end py-3 sm:py-4 md:py-6 px-3 sm:px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-100 sm:opacity-0 sm:hover:opacity-100"
        )}
      >
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white leading-tight">
          {card.title}
        </h2>

        {/* Optional description */}
        {card.description && (
          <p className="text-xs sm:text-sm text-gray-200 mt-1 sm:mt-2 line-clamp-2 sm:line-clamp-3">
            {card.description}
          </p>
        )}

        {/* Tech stack (for projects) */}
        {card.tech_stack && (
          <div className="flex flex-wrap gap-1 sm:gap-2 mt-2 sm:mt-3">
            {card.tech_stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
            {card.tech_stack.length > 3 && (
              <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">
                +{card.tech_stack.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Date (for blogs) */}
        {card.date && (
          <p className="text-xs text-gray-300 mt-1 sm:mt-2">Posted {card.date}</p>
        )}
      </div>
    </Link>
  )
);

Card.displayName = "Card";

export function FocusCards({ cards }: { cards: CardData[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto px-3 sm:px-4 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}