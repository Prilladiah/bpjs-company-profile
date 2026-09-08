import Image from "next/image";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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