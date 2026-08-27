"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Login gagal");
        return;
      }
      const redirect = searchParams.get("redirect") || "/admin/berita";
      router.push(redirect);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-blue-light px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-xl bg-white p-8 shadow-card">
        <div className="mb-6 text-center">
          <p className="text-xl font-bold text-brand-blue">
            BPJS <span className="text-brand-green">Ketenagakerjaan</span>
          </p>
          <p className="text-xs font-semibold uppercase text-gray-400">Admin Panel · Yogyakarta</p>
        </div>

        {error && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        )}

        <label className="mb-1 block text-sm font-semibold text-gray-700">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-blue"
        />

        <label className="mb-1 block text-sm font-semibold text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-6 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand-blue"
        />

        <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
          <LogIn size={18} />
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}