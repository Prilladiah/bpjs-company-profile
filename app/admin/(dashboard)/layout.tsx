"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/login", {
          method: "GET",
          cache: "no-store",
        });
        if (!res.ok) {
          window.location.replace("/admin/login");
          return;
        }
        setChecked(true);
      } catch {
        window.location.replace("/admin/login");
      }
    }

    checkAuth();

    function handlePageShow() {
      checkAuth();
    }
    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        checkAuth();
      }
    }

    window.addEventListener("pageshow", handlePageShow);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (!checked) return null;

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <div className="flex-1">
        <header className="border-b border-gray-100 bg-white px-4 py-4 sm:px-8">
          <Image
            src="/images/logobpjs.png"
            alt="BPJS Ketenagakerjaan"
            width={160}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </header>
        <main className="overflow-x-auto p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}