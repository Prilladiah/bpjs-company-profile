"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/layanan", label: "Layanan" },
  { href: "/cara-klaim", label: "Cara Klaim" },
  { href: "/galeri", label: "Galeri" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-9 w-32 sm:h-11 sm:w-40 md:h-12 md:w-48">
            <Image
              src="/images/logobpjs.png"
              alt="Logo BPJS Ketenagakerjaan"
              fill
              priority
              sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium text-gray-700 transition hover:text-brand-green",
                  pathname === link.href && "text-brand-green"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="text-gray-700 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <ul className="flex flex-col gap-1 border-t border-gray-100 bg-white px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-brand-blue-light",
                  pathname === link.href && "text-brand-green"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}