"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

const colors = [
  "#93c5fd", "#f9a8d4", "#86efac",
  "#fde047", "#fca5a5", "#d8b4fe",
  "#a5b4fc", "#c4b5fd"
];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function BoxesBackground() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-[1px] bg-[#000b1f] z-0">
      {Array.from({ length: 96 }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "transition-colors duration-200",
            "bg-[#00050f]"
          )}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{
            backgroundColor: hovered === i ? getRandomColor() : "rgb(25, 26, 28)"
          }}
        />
      ))}
    </div>
  );
}
