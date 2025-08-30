"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Carousel from "@/components/ui/carousel";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Service = {
  name: string;
  description: string;
  image_url: string;
};

export default function ServicesCarousel() {
  const [slides, setSlides] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error } = await supabase.from("services").select("*");

        if (error) {
          console.error("Error fetching services:", error);
          return;
        }

        if (data) {
          // ✅ Map services and build correct Supabase public URLs
          const formatted = data.map((s) => {
            // Check if image_url already contains a full URL
            if (s.image_url.startsWith('http')) {
              console.log("Using existing full URL:", s.image_url); // Debug log
              return {
                name: s.name,
                description: s.description,
                image_url: s.image_url,
              };
            }
            
            // If it's just a filename/path, construct the full URL
            // Remove any leading "services/" if it exists to avoid duplication
            const cleanPath = s.image_url.startsWith('services/') 
              ? s.image_url.substring(8) 
              : s.image_url;
            
            const { data: publicUrlData } = supabase.storage
              .from("services") // bucket name
              .getPublicUrl(cleanPath); // stored path (without extra "services" folder)

            return {
              name: s.name,
              description: s.description,
              image_url: publicUrlData.publicUrl,
            };
          });
          
          setSlides(formatted);
        }
      } catch (err) {
        console.error("Unexpected error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[200px] sm:h-[250px] md:h-[300px] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-sm sm:text-base">Loading services...</p>
        </div>
      </div>
    );
  }

  if (!slides.length) {
    return (
      <div className="flex justify-center items-center h-[200px] sm:h-[250px] md:h-[300px] text-white">
        <div className="text-center px-4">
          <p className="text-sm sm:text-base text-gray-400">
            No services available at the moment.
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Please check back later or contact us directly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden w-full h-full py-8 sm:py-12 md:py-15">
      <div className="min-h-[200px] sm:min-h-[200px] md:min-h-[200px] lg:min-h-[200px]">
        <Carousel slides={slides} />
      </div>
    </div>
  );
}