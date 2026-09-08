"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Building2 } from "lucide-react";
import type { KerjasamaLogo } from "@/types";

/**
 * Baris logo mitra yang bisa digeser ke samping.
 * - Klik panah = geser satu langkah.
 * - Tekan & tahan panah = terus menggeser selama ditahan (mouse & touch).
 * - Klik & tahan lalu geser mouse di area logo = drag-to-scroll (desktop).
 * - Di HP, area logo sudah bisa digeser langsung pakai jari (touch scroll native).
 */
export default function LogoCarousel({ logos }: { logos: KerjasamaLogo[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const draggedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const source = logos;

  const scrollByStep = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 160, behavior: "smooth" });
  };

  const startHold = (dir: 1 | -1) => {
    stopHold();
    scrollByStep(dir);
    intervalRef.current = setInterval(() => scrollByStep(dir), 220);
  };

  const stopHold = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // --- Drag-to-scroll pakai mouse (desktop) ---
  const handleDragStart = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDraggingRef.current = true;
    draggedRef.current = false;
    setIsDragging(true);
    startXRef.current = e.pageX - trackRef.current.offsetLeft;
    startScrollLeftRef.current = trackRef.current.scrollLeft;
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 3) draggedRef.current = true;
    trackRef.current.scrollLeft = startScrollLeftRef.current - walk;
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  // Mencegah klik logo ter-trigger tepat setelah selesai drag
  const handleClickCapture = (e: React.MouseEvent) => {
    if (draggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      draggedRef.current = false;
    }
  };

  if (source.length === 0) return null;

  return (
    <div className="mt-6 flex items-center gap-2 sm:gap-4">
      <button
        type="button"
        aria-label="Geser ke kiri"
        onMouseDown={() => startHold(-1)}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={() => startHold(-1)}
        onTouchEnd={stopHold}
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition hover:border-brand-blue hover:text-brand-blue active:scale-95"
      >
        <ChevronLeft size={18} />
      </button>

      <div
        ref={trackRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onClickCapture={handleClickCapture}
        className={`flex flex-1 select-none gap-4 overflow-x-auto py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          isDragging ? "cursor-grabbing scroll-auto" : "cursor-grab scroll-smooth"
        }`}
      >
        {source.map((logo) => (
          <div
            key={logo.id}
            className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-gray-300 bg-gray-50 shadow-sm ring-1 ring-gray-100 sm:h-20 sm:w-20"
            title={logo.nama}
          >
            {logo.logo ? (
              <Image
                src={logo.logo}
                alt={logo.nama}
                width={80}
                height={80}
                draggable={false}
                className="h-full w-full object-contain p-2"
              />
            ) : (
              <Building2 className="text-gray-400" size={28} />
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Geser ke kanan"
        onMouseDown={() => startHold(1)}
        onMouseUp={stopHold}
        onMouseLeave={stopHold}
        onTouchStart={() => startHold(1)}
        onTouchEnd={stopHold}
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition hover:border-brand-blue hover:text-brand-blue active:scale-95"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}