"use client";

export default function BoxesBackground() {
  return (
    <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-[1px] bg-[#000b1f] z-0">
      {Array.from({ length: 96 }).map((_, i) => (
        <div
          key={i}
          className="bg-[#00050f]"
        />
      ))}
    </div>
  );
}