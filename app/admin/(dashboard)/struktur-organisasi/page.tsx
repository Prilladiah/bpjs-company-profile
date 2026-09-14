"use client";

import { useEffect, useState } from "react";
import { UploadCloud, FileText, CheckCircle2, XCircle } from "lucide-react";
import type { StrukturOrganisasiFile } from "@/types";

type ToastState = { type: "success" | "error"; message: string } | null;

export default function StrukturOrganisasiPage() {
  const [data, setData] = useState<StrukturOrganisasiFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    fetch("/api/struktur-organisasi")
      .then((res) => res.json())
      .then((d) => setData(d.data))
      .finally(() => setLoading(false));
  }, []);

  // Toast otomatis hilang setelah 3 detik
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPdf = file.type === "application/pdf";
    const isImage = file.type.startsWith("image/");
    if (!isPdf && !isImage) {
      setToast({ type: "error", message: "File harus berupa gambar (PNG/JPG) atau PDF" });
      e.target.value = "";
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });

      if (!uploadRes.ok) {
        const text = await uploadRes.text();
        console.error("Upload gagal, response mentah:", text);
        setToast({ type: "error", message: `Gagal mengunggah file (status ${uploadRes.status})` });
        return;
      }

      const uploadData = await uploadRes.json();

      const saveRes = await fetch("/api/struktur-organisasi", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileUrl: uploadData.url, fileType: isPdf ? "pdf" : "image" }),
      });
      const saveData = await saveRes.json();

      if (saveRes.ok) {
        setData(saveData.data);
        setToast({ type: "success", message: "Gambar struktur organisasi berhasil diunggah!" });
      } else {
        setToast({ type: "error", message: saveData.error ?? "Gagal menyimpan data struktur organisasi" });
      }
    } catch (err) {
      console.error("Error saat upload:", err);
      setToast({ type: "error", message: "Terjadi kesalahan saat mengunggah file" });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Struktur Organisasi</h1>

      <div className="card-surface p-6">
        {loading && <p className="text-center text-gray-400">Memuat...</p>}

        {!loading && (
          <div>
            {data?.fileUrl ? (
              data.fileType === "pdf" ? (
                <div className="flex flex-col items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-10">
                  <FileText size={48} className="text-brand-blue" />
                  <a
                    href={data.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-brand-blue underline"
                  >
                    Lihat file PDF struktur organisasi
                  </a>
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.fileUrl}
                  alt="Struktur Organisasi"
                  className="mx-auto max-h-[500px] w-auto rounded-lg border border-gray-200 object-contain"
                />
              )
            ) : (
              <p className="py-12 text-center text-gray-400">
                Belum ada file struktur organisasi yang diunggah
              </p>
            )}

            <div className="mt-6 flex justify-center">
              <label className="btn-primary cursor-pointer">
                <UploadCloud size={18} />
                {uploading ? "Mengunggah..." : "Ubah"}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,application/pdf"
                  onChange={handleUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            </div>
            <p className="mt-2 text-center text-xs text-gray-400">Format: PNG, JPG, atau PDF.</p>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg transition-all ${
            toast.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={20} />
          ) : (
            <XCircle size={20} />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}