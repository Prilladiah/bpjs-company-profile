"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import Modal from "@/components/admin/Modal";
import type { StrukturOrganisasi } from "@/types";

const EMPTY_FORM = { nama: "", jabatan: "", parentId: "", urutan: 0 };

export default function StrukturOrganisasiPage() {
  const [list, setList] = useState<StrukturOrganisasi[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<StrukturOrganisasi | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async (query = "") => {
    setLoading(true);
    const res = await fetch(`/api/struktur-organisasi${query ? `?q=${encodeURIComponent(query)}` : ""}`);
    const data = await res.json();
    setList(data.data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Flatten (top-level items + their children) for both the table and the parent dropdown
  const flatList: StrukturOrganisasi[] = list.flatMap((item) => [item, ...(item.children ?? [])]);
  const topLevel = list;

  function openAdd() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(item: StrukturOrganisasi) {
    setEditing(item);
    setForm({ nama: item.nama, jabatan: item.jabatan, parentId: item.parentId ?? "", urutan: item.urutan });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editing ? `/api/struktur-organisasi/${editing.id}` : "/api/struktur-organisasi";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, parentId: form.parentId || null }),
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
    if (!confirm("Hapus pejabat ini? Jabatan di bawahnya juga akan terhapus.")) return;
    await fetch(`/api/struktur-organisasi/${id}`, { method: "DELETE" });
    load(q);
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Struktur Organisasi</h1>

      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              load(e.target.value);
            }}
            placeholder="Cari Nama / Jabatan"
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
              <th className="px-4 py-3 font-semibold">Nama</th>
              <th className="px-4 py-3 font-semibold">Jabatan</th>
              <th className="px-4 py-3 font-semibold">Atasan</th>
              <th className="px-4 py-3 text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {loading && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-400">Memuat...</td></tr>
            )}
            {!loading && flatList.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-400">Belum ada data struktur organisasi</td></tr>
            )}
            {flatList.map((item) => {
              const parent = flatList.find((p) => p.id === item.parentId);
              return (
                <tr key={item.id}>
                  <td className="px-4 py-3">{item.nama}</td>
                  <td className="px-4 py-3">{item.jabatan}</td>
                  <td className="px-4 py-3 text-gray-500">{parent ? parent.jabatan : "—"}</td>
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
              );
            })}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <Modal title={editing ? "Edit Pejabat" : "Tambah Pejabat"} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">Nama*</label>
              <input
                required
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">Jabatan*</label>
              <input
                required
                value={form.jabatan}
                onChange={(e) => setForm({ ...form, jabatan: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">Atasan (opsional)</label>
              <select
                value={form.parentId}
                onChange={(e) => setForm({ ...form, parentId: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-blue"
              >
                <option value="">— Tidak ada (Kepala Kantor Cabang) —</option>
                {topLevel
                  .filter((p) => p.id !== editing?.id)
                  .map((p) => (
                    <option key={p.id} value={p.id}>{p.jabatan} — {p.nama}</option>
                  ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">Urutan</label>
              <input
                type="number"
                value={form.urutan}
                onChange={(e) => setForm({ ...form, urutan: Number(e.target.value) })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
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
