"use client";

import { useEffect, useState } from "react";
import { UploadCloud, FileText } from "lucide-react";
import type { StrukturOrganisasiFile } from "@/types";

export default function StrukturOrganisasiPage() {
  const [data, setData] = useState<StrukturOrganisasiFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/struktur-organisasi")
      .then((res) => res.json())
      .then((d) => setData(d.data))
      .finally(() => setLoading(false));
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPdf = file.type === "application/pdf";
    const isImage = file.type.startsWith("image/");
    if (!isPdf && !isImage) {
      alert("File harus berupa gambar (PNG/JPG) atau PDF");
      e.target.value = "";
      return;
    }

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) {
        alert(uploadData.error ?? "Gagal mengunggah file");
        return;
      }

      const saveRes = await fetch("/api/struktur-organisasi", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileUrl: uploadData.url, fileType: isPdf ? "pdf" : "image" }),
      });
      const saveData = await saveRes.json();
      if (saveRes.ok) setData(saveData.data);
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
    </div>
  );
}
