"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Newspaper, Images, Handshake, Network, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const MENU = [
  { href: "/admin/berita", label: "Kelola Berita", icon: Newspaper },
  { href: "/admin/galeri", label: "Kelola Galeri", icon: Images },
  { href: "/admin/kerjasama", label: "Kelola Kerjsama", icon: Handshake },
  { href: "/admin/struktur-organisasi", label: "Struktur Organisasi", icon: Network },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="flex h-screen w-64 flex-shrink-0 flex-col justify-between bg-brand-blue-dark text-white">
      <nav className="mt-4 flex flex-col gap-1 px-3">
        {MENU.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-4 py-3 text-sm font-semibold transition",
                active ? "bg-brand-blue" : "hover:bg-white/10"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="m-3 flex items-center gap-3 rounded-md px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
      >
        <LogOut size={18} />
        Keluar
      </button>
    </aside>
  );
}
