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
        "rounded-xl relative bg-gray-100 dark:bg-neutral-900 overflow-hidden w-full transition-all duration-300 ease-out shadow-lg hover:shadow-2xl",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      {/* Image wrapper with 16:9 ratio */}
      <div className="relative w-full aspect-video">
        <Image
          src={card.src}
          alt={card.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Overlay on hover */}
      <div
        className={cn(
          "absolute inset-0 bg-black/60 flex flex-col justify-end py-6 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <h2 className="text-lg md:text-xl font-semibold text-white">
          {card.title}
        </h2>

        {/* Optional description */}
        {card.description && (
          <p className="text-sm text-gray-200 mt-2 line-clamp-2">
            {card.description}
          </p>
        )}

        {/* Tech stack (for projects) */}
        {card.tech_stack && (
          <div className="flex flex-wrap gap-2 mt-3">
            {card.tech_stack.map((tech) => (
              <span
                key={tech}
                className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Date (for blogs) */}
        {card.date && (
          <p className="text-xs text-gray-300 mt-2">Posted {card.date}</p>
        )}
      </div>
    </Link>
  )
);

Card.displayName = "Card";

export function FocusCards({ cards }: { cards: CardData[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 w-full">
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