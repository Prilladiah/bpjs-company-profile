"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Newspaper, Images, Handshake, Network, LogOut, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import ChangePasswordModal from "@/components/admin/ChangePasswordModal";

const MENU = [
  { href: "/admin/berita", label: "Kelola Berita", icon: Newspaper },
  { href: "/admin/galeri", label: "Kelola Galeri", icon: Images },
  { href: "/admin/kerjasama", label: "Kelola Kerja Sama", icon: Handshake },
  { href: "/admin/struktur-organisasi", label: "Struktur Organisasi", icon: Network },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, admin } = useAuth();
  const [accountOpen, setAccountOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-shrink-0 flex-col justify-between bg-brand-blue-dark text-white">
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

      <div className="border-t border-white/10 p-3">
        {/* Info akun */}
        <button
          onClick={() => setAccountOpen((prev) => !prev)}
          className="flex w-full items-center justify-between rounded-md px-4 py-3 text-sm font-semibold hover:bg-white/10"
        >
          <span className="flex items-center gap-3">
            <User size={18} />
            {admin?.username ?? "Admin"}
          </span>
          <ChevronDown
            size={16}
            className={cn("transition-transform", accountOpen && "rotate-180")}
          />
        </button>

        {accountOpen && (
          <button
            onClick={() => {
              setModalOpen(true);
              setAccountOpen(false);
            }}
            className="mt-1 block w-full rounded-md px-4 py-2 text-left text-sm text-white/80 hover:bg-white/10"
          >
            Ganti Password
          </button>
        )}

        <button
          onClick={logout}
          className="mt-1 flex w-full items-center gap-3 rounded-md px-4 py-3 text-sm font-semibold hover:bg-white/10"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </div>

      {modalOpen && (
        <ChangePasswordModal onClose={() => setModalOpen(false)} />
      )}
    </aside>
  );
}