"use client";

import Link from "next/link";
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
        <Link href="/" className="flex items-center gap-2">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 2C10 2 2 10 2 20s8 18 18 18 18-8 18-18S30 2 20 2z" fill="none" />
            <path d="M8 28c4-10 12-18 24-20-2 12-10 20-24 20z" fill="#4CAF50" />
            <path d="M4 32c6-8 14-14 24-16-4 10-14 16-24 16z" fill="#003C71" />
            <path d="M2 34c5-6 12-10 20-12-3 8-11 12-20 12z" fill="#C6D62E" />
          </svg>
          <div className="leading-tight">
            <p className="text-lg font-bold text-brand-blue">
              BPJS <span className="block -mt-1 text-brand-green">Ketenagakerjaan</span>
            </p>
          </div>
          <div className="ml-2 hidden border-l border-gray-300 pl-2 text-[11px] font-semibold uppercase text-brand-blue sm:block">
            Kantor Cabang
            <br />
            Yogyakarta
          </div>
        </Link>

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

        <button
          className="text-gray-700 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

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
