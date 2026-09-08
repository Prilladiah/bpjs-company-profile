"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Building2 } from "lucide-react";
import Modal from "@/components/admin/Modal";
import type { KerjasamaLogo } from "@/types";

const EMPTY_LOGO_FORM = { nama: "", logo: "", link: "", urutan: 0 };

export default function KelolaKerjasamaPage() {
  const [logoList, setLogoList] = useState<KerjasamaLogo[]>([]);
  const [logoLoading, setLogoLoading] = useState(true);
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const [editingLogo, setEditingLogo] = useState<KerjasamaLogo | null>(null);
  const [logoForm, setLogoForm] = useState(EMPTY_LOGO_FORM);
  const [savingLogo, setSavingLogo] = useState(false);

  const loadLogo = useCallback(async () => {
    setLogoLoading(true);
    const res = await fetch("/api/auth/kerjasama_logo");
    const data = await res.json();
    setLogoList(data.data ?? []);
    setLogoLoading(false);
  }, []);

  useEffect(() => {
    loadLogo();
  }, [loadLogo]);

  function openAddLogo() {
    setEditingLogo(null);
    setLogoForm({ ...EMPTY_LOGO_FORM, urutan: logoList.length + 1 });
    setLogoModalOpen(true);
  }

  function openEditLogo(item: KerjasamaLogo) {
    setEditingLogo(item);
    setLogoForm({
      nama: item.nama,
      logo: item.logo ?? "",
      link: item.link ?? "",
      urutan: item.urutan,
    });
    setLogoModalOpen(true);
  }

  async function handleUploadLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (res.ok) setLogoForm((f) => ({ ...f, logo: data.url }));
  }

  async function handleSubmitLogo(e: React.FormEvent) {
    e.preventDefault();
    setSavingLogo(true);
    try {
      const url = editingLogo
        ? `/api/auth/kerjasama_logo/${editingLogo.id}`
        : "/api/auth/kerjasama_logo";
      const method = editingLogo ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logoForm),
      });
      if (res.ok) {
        setLogoModalOpen(false);
        loadLogo();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? "Gagal menyimpan logo mitra");
      }
    } finally {
      setSavingLogo(false);
    }
  }

  async function handleDeleteLogo(id: string) {
    if (!confirm("Hapus logo mitra ini?")) return;
    await fetch(`/api/auth/kerjasama_logo/${id}`, { method: "DELETE" });
    loadLogo();
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-gray-900">Kelola Logo Mitra</h1>
      <p className="mb-6 text-sm text-gray-500">
        Logo-logo ini tampil sebagai carousel bulat di halaman depan pada bagian Kerjasama Kami.
      </p>

      <div className="mb-4 flex justify-end">
        <button onClick={openAddLogo} className="btn-primary whitespace-nowrap">
          <Plus size={18} /> Tambah Logo
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="px-4 py-3 text-center font-semibold">Logo</th>
              <th className="px-4 py-3 font-semibold">Nama</th>
              <th className="px-4 py-3 font-semibold">Link</th>
              <th className="px-4 py-3 text-center font-semibold">Urutan</th>
              <th className="px-4 py-3 text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {logoLoading && (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-400">Memuat...</td></tr>
            )}
            {!logoLoading && logoList.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-gray-400">Belum ada logo mitra</td></tr>
            )}
            {logoList.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 text-center">
                  {item.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.logo} alt={item.nama} className="mx-auto h-10 w-10 rounded-full border object-contain p-1" />
                  ) : (
                    <Building2 className="mx-auto text-gray-300" size={20} />
                  )}
                </td>
                <td className="px-4 py-3">{item.nama}</td>
                <td className="max-w-[200px] truncate px-4 py-3 text-brand-blue">{item.link || "-"}</td>
                <td className="px-4 py-3 text-center">{item.urutan}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-3">
                    <button onClick={() => openEditLogo(item)} className="text-green-600 hover:text-green-800">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDeleteLogo(item.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {logoModalOpen && (
        <Modal title={editingLogo ? "Edit Logo Mitra" : "Tambah Logo Mitra"} onClose={() => setLogoModalOpen(false)}>
          <form onSubmit={handleSubmitLogo} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">Nama Mitra*</label>
              <input
                required
                value={logoForm.nama}
                onChange={(e) => setLogoForm({ ...logoForm, nama: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">Link (opsional)</label>
              <input
                value={logoForm.link}
                onChange={(e) => setLogoForm({ ...logoForm, link: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">Urutan</label>
              <input
                type="number"
                value={logoForm.urutan}
                onChange={(e) => setLogoForm({ ...logoForm, urutan: Number(e.target.value) })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">Logo*</label>
              <input type="file" accept="image/*" onChange={handleUploadLogo} className="text-sm" />
              {logoForm.logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoForm.logo} alt="preview" className="mt-2 h-20 w-20 rounded-full border object-contain p-2" />
              )}
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setLogoModalOpen(false)} className="btn-secondary">
                Batal
              </button>
              <button type="submit" disabled={savingLogo} className="btn-primary">
                {savingLogo ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}