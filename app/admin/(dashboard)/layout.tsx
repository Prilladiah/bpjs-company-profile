import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar />
      <div className="flex-1">
        <header className="border-b border-gray-100 bg-white px-8 py-4">
          <span className="text-lg font-bold text-brand-blue">
            BPJS <span className="text-brand-green">Ketenagakerjaan</span>
          </span>
          <span className="ml-2 text-xs font-semibold uppercase text-gray-400">
            Kantor Cabang Yogyakarta
          </span>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
