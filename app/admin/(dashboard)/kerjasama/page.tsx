"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Plus, Pencil, Trash2, ImageIcon } from "lucide-react";
import Modal from "@/components/admin/Modal";
import { KERJASAMA_KATEGORI_LABEL } from "@/lib/utils";
import type { Kerjasama, KerjasamaKategori } from "@/types";

const EMPTY_FORM = {
  namaPerusahaan: "",
  kategori: "PEMERINTAH_DAERAH" as KerjasamaKategori,
  deskripsi: "",
  foto: "",
  urutan: 0,
};

export default function KelolaKerjasamaPage() {
  const [list, setList] = useState<Kerjasama[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Kerjasama | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async (query = "") => {
    setLoading(true);
    const res = await fetch(`/api/kerjasama${query ? `?q=${encodeURIComponent(query)}` : ""}`);
    const data = await res.json();
    setList(data.data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  function openAdd() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(item: Kerjasama) {
    setEditing(item);
    setForm({
      namaPerusahaan: item.namaPerusahaan,
      kategori: item.kategori,
      deskripsi: item.deskripsi ?? "",
      foto: item.foto ?? "",
      urutan: item.urutan,
    });
    setModalOpen(true);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (res.ok) setForm((f) => ({ ...f, foto: data.url }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editing ? `/api/kerjasama/${editing.id}` : "/api/kerjasama";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setModalOpen(false);
        load(q);
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus kerjasama ini?")) return;
    await fetch(`/api/kerjasama/${id}`, { method: "DELETE" });
    load(q);
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Kelola Kerjasama</h1>

      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              load(e.target.value);
            }}
            placeholder="Cari Galeri"
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm outline-none focus:border-brand-blue"
          />
        </div>
        <button onClick={openAdd} className="btn-primary whitespace-nowrap">
          <Plus size={18} /> Tambah
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="px-4 py-3 font-semibold">Nama Perusahaan</th>
              <th className="px-4 py-3 font-semibold">Kategori</th>
              <th className="px-4 py-3 text-center font-semibold">Foto</th>
              <th className="px-4 py-3 text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {loading && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-400">Memuat...</td></tr>
            )}
            {!loading && list.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-400">Belum ada data kerjasama</td></tr>
            )}
            {list.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3">{item.namaPerusahaan}</td>
                <td className="px-4 py-3">{KERJASAMA_KATEGORI_LABEL[item.kategori]}</td>
                <td className="px-4 py-3 text-center">
                  {item.foto ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.foto} alt="" className="mx-auto h-8 w-8 rounded object-cover" />
                  ) : (
                    <ImageIcon className="mx-auto text-gray-300" size={20} />
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-3">
                    <button onClick={() => openEdit(item)} className="text-green-600 hover:text-green-800">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <Modal title={editing ? "Edit Kerjasama" : "Tambah Kerjasama"} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">Nama Perusahaan*</label>
              <input
                required
                value={form.namaPerusahaan}
                onChange={(e) => setForm({ ...form, namaPerusahaan: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">Kategori*</label>
              <select
                required
                value={form.kategori}
                onChange={(e) => setForm({ ...form, kategori: e.target.value as KerjasamaKategori })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-blue"
              >
                {Object.entries(KERJASAMA_KATEGORI_LABEL).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">Deskripsi</label>
              <textarea
                value={form.deskripsi}
                onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">Foto</label>
              <input type="file" accept="image/*" onChange={handleUpload} className="text-sm" />
              {form.foto && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.foto} alt="preview" className="mt-2 h-40 w-full rounded-md object-cover" />
              )}
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">
                Batal
              </button>
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
